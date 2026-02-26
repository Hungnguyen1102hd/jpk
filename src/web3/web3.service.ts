import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, Contract, JsonRpcProvider } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class Web3Service implements OnModuleInit {
  private readonly logger = new Logger(Web3Service.name);
  private provider: JsonRpcProvider;
  private contract: Contract;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.initProvider();
    this.listenToEvents();
  }

  private initProvider() {
    const rpcUrl =
      this.configService.get<string>('BSC_RPC_URL') ??
      'https://data-seed-prebsc-1-s1.binance.org:8545';
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    this.logger.log(`Initialized Web3 Provider with URL: ${rpcUrl}`);

    const contractAddress =
      this.configService.get<string>('LOTTERY_CONTRACT_ADDRESS') ??
      this.configService.get<string>('CONTRACT_ADDRESS') ??
      ethers.ZeroAddress;
    if (contractAddress === ethers.ZeroAddress) {
      this.logger.warn(
        'LOTTERY_CONTRACT_ADDRESS/CONTRACT_ADDRESS not found in environment variables. Using ZeroAddress fallback.',
      );
    }

    const abi = [
      'event TicketPurchased(address indexed buyer, uint256 ticketId, uint8[6] numbers)',
      'event DrawExecuted(uint256 indexed drawId, uint8[6] winningNumbers, uint256 totalPrize)',
    ];

    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  private listenToEvents() {
    this.logger.log('Starting to listen to smart contract events...');

    const handleError = (error: Error) => {
      this.logger.error(
        `Error in event listener or provider: ${error.message}`,
      );
      // Attempt to reconnect after 5 seconds to handle disconnected RPCs
      setTimeout(() => {
        this.logger.log('Attempting to reconnect...');
        try {
          void this.contract.removeAllListeners();
          this.initProvider();
          this.listenToEvents();
        } catch (reconnectErr) {
          this.logger.error(
            `Reconnection failed: ${(reconnectErr as Error).message}`,
          );
        }
      }, 5000);
    };

    try {
      // Handle TicketPurchased Event
      void this.contract.on(
        'TicketPurchased',
        (buyer: string, ticketId: bigint, numbers: number[]) => {
          void (async () => {
            try {
              await this.handleTicketPurchasedEvent(buyer, ticketId, numbers);
            } catch (err) {
              this.logger.error(
                `Error processing TicketPurchased event: ${(err as Error).message}`,
              );
            }
          })();
        },
      );

      // Handle DrawExecuted Event
      void this.contract.on(
        'DrawExecuted',
        (drawId: bigint, winningNumbers: number[], totalPrize: bigint) => {
          void (async () => {
            try {
              this.logger.log(
                `DrawExecuted event received: drawId=${drawId}, prize=${totalPrize}`,
              );

              // Create new Draw record as per requirement
              await this.prisma.draw.create({
                data: {
                  onChainDrawId: Number(drawId),
                  winningNumbers: Array.from(winningNumbers).map(Number),
                  totalPrize: totalPrize.toString(),
                  status: 'COMPLETED',
                  executedAt: new Date(),
                },
              });

              this.logger.log(`Draw ${drawId} saved to database successfully.`);
            } catch (err) {
              this.logger.error(
                `Error processing DrawExecuted event: ${(err as Error).message}`,
              );
            }
          })();
        },
      );

      // Fallback catch provider errors
      void this.provider.on('error', handleError);
    } catch (err) {
      handleError(err as Error);
    }
  }

  /**
   * Backfill tickets by scanning historical TicketPurchased events using eth_getLogs.
   * NOTE: Some public RPCs may rate-limit eth_getLogs; if that happens,
   * prefer backfillTicketsFromTxHashes instead.
   * Safe to run multiple times thanks to ticket upsert on onChainTicketId.
   */
  async backfillTicketsFromEvents(
    fromBlock: number,
    toBlock?: number,
  ): Promise<{ processed: number }> {
    if (!Number.isInteger(fromBlock) || fromBlock < 0) {
      throw new Error('fromBlock must be a non-negative integer');
    }

    const endBlock =
      typeof toBlock === 'number' && toBlock >= fromBlock ? toBlock : undefined;

    this.logger.log(
      `Starting backfill from block ${fromBlock}${
        endBlock !== undefined ? ` to block ${endBlock}` : ''
      }`,
    );

    const filter = this.contract.filters.TicketPurchased();
    const logs = await this.contract.queryFilter(filter, fromBlock, endBlock);

    this.logger.log(`Found ${logs.length} TicketPurchased events to process.`);

    let processed = 0;
    // Process sequentially to avoid overwhelming the DB
    // and to keep logs readable.
    for (const log of logs) {
      // In ethers v6, queryFilter returns EventLog entries which include args.
      const eventLog = log as unknown as {
        args: { buyer: string; ticketId: bigint; numbers: readonly number[] };
      };
      const { buyer, ticketId, numbers } = eventLog.args;

      try {
        await this.handleTicketPurchasedEvent(buyer, ticketId, numbers);
        processed += 1;
      } catch (err) {
        this.logger.error(
          `Failed to backfill ticketId=${ticketId}: ${
            (err as Error).message
          }`,
        );
      }
    }

    this.logger.log(`Backfill complete. Processed ${processed} events.`);
    return { processed };
  }

  /**
   * Backfill a single ticket by transaction hash, using eth_getTransactionReceipt
   * instead of eth_getLogs to avoid provider rate limits.
   */
  async backfillTicketFromTxHash(
    txHash: string,
  ): Promise<{ processed: number }> {
    if (!txHash || !txHash.startsWith('0x') || txHash.length < 66) {
      throw new Error('Invalid txHash');
    }

    this.logger.log(`Backfilling TicketPurchased from tx ${txHash}`);

    const receipt = await this.provider.getTransactionReceipt(txHash);
    if (!receipt) {
      this.logger.warn(`No receipt found for tx ${txHash}`);
      return { processed: 0 };
    }

    const logsForContract = receipt.logs.filter(
      (log) =>
        log.address.toLowerCase() ===
        this.contract.target.toString().toLowerCase(),
    );

    let decoded: {
      buyer: string;
      ticketId: bigint;
      numbers: readonly number[];
    } | null = null;

    for (const log of logsForContract) {
      try {
        const parsed = this.contract.interface.decodeEventLog(
          'TicketPurchased',
          log.data,
          log.topics,
        ) as unknown as {
          buyer: string;
          ticketId: bigint;
          numbers: readonly number[];
        };
        decoded = parsed;
        break;
      } catch {
        // Not the TicketPurchased event, continue
      }
    }

    if (!decoded) {
      this.logger.warn(
        `No TicketPurchased log found in tx ${txHash}; skipping.`,
      );
      return { processed: 0 };
    }

    await this.handleTicketPurchasedEvent(
      decoded.buyer,
      decoded.ticketId,
      decoded.numbers,
    );

    return { processed: 1 };
  }

  /**
   * Common handler for both live events and backfill flow.
   */
  private async handleTicketPurchasedEvent(
    buyer: string,
    ticketId: bigint,
    numbers: readonly number[],
  ): Promise<void> {
    this.logger.log(
      `TicketPurchased event received: ticketId=${ticketId}, buyer=${buyer}`,
    );

    // Upsert User
    const user = await this.prisma.user.upsert({
      where: { walletAddress: buyer.toLowerCase() },
      update: {},
      create: { walletAddress: buyer.toLowerCase() },
    });

    // We link the ticket to a draw. We will fall back to a generic draw or latest pending
    let latestDraw = await this.prisma.draw.findFirst({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestDraw) {
      this.logger.warn(
        `No PENDING draw found for Ticket ID ${ticketId}. Using fallback draw.`,
      );
      latestDraw = await this.prisma.draw.create({
        data: {
          onChainDrawId: 0,
          winningNumbers: [],
          totalPrize: '0',
          status: 'PENDING',
          executedAt: new Date(),
        },
      });
    }

    // Upsert Ticket record on onChainTicketId to avoid duplicates
    await this.prisma.ticket.upsert({
      where: { onChainTicketId: Number(ticketId) },
      update: {
        numbers: Array.from(numbers).map(Number),
        drawId: latestDraw.id,
        userId: user.id,
      },
      create: {
        onChainTicketId: Number(ticketId),
        numbers: Array.from(numbers).map(Number),
        drawId: latestDraw.id,
        userId: user.id,
      },
    });

    this.logger.log(`Ticket ${ticketId} saved to database successfully.`);
  }
}
