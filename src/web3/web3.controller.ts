import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { Web3Service } from './web3.service';

@Controller('api/admin')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  /**
   * Backfill TicketPurchased events from a given block range into the database.
   *
   * Example:
   *   GET /api/admin/backfill-tickets?fromBlock=9256400&toBlock=9256500
   */
  @Get('backfill-tickets')
  async backfillTickets(
    @Query('fromBlock') fromBlockParam?: string,
    @Query('toBlock') toBlockParam?: string,
  ) {
    const fromBlock = Number(fromBlockParam);
    if (!Number.isInteger(fromBlock) || fromBlock < 0) {
      throw new BadRequestException(
        'Query parameter "fromBlock" is required and must be a non-negative integer.',
      );
    }

    const toBlock =
      typeof toBlockParam === 'string' && toBlockParam.length > 0
        ? Number(toBlockParam)
        : undefined;

    if (toBlock !== undefined && (!Number.isInteger(toBlock) || toBlock < 0)) {
      throw new BadRequestException(
        'Query parameter "toBlock", if provided, must be a non-negative integer.',
      );
    }

    return this.web3Service.backfillTicketsFromEvents(fromBlock, toBlock);
  }

  /**
   * Backfill a single TicketPurchased event from a specific transaction hash.
   *
   * Example:
   *   GET /api/admin/backfill-ticket-by-tx?txHash=0x...
   */
  @Get('backfill-ticket-by-tx')
  async backfillTicketByTx(@Query('txHash') txHash?: string) {
    if (!txHash) {
      throw new BadRequestException('Query parameter "txHash" is required.');
    }

    return this.web3Service.backfillTicketFromTxHash(txHash);
  }
}
