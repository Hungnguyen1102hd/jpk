import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { Contract, JsonRpcProvider, ethers } from 'ethers';

export interface JackpotStatsResponse {
  tokenAddress: string;
  lotteryAddress: string;
  rawBalance: string;
  formattedBalance: string;
}

export interface NextDrawTimeResponse {
  nextDrawTimestamp: number;
  nextDrawDateTimeIso: string;
}

export interface RecentWinnerResponse {
  walletAddress: string;
  maskedWalletAddress: string;
  drawId: number | null;
  prizeAmount: string;
  updatedAt: string;
}

export interface DrawHistoryItem {
  id: string;
  onChainDrawId: number;
  winningNumbers: number[];
  totalPrize: string;
  status: string;
  transactionHash: string | null;
  executedAt: string;
  ticketCount: number;
  winnerCount: number;
}

export interface PrizeTier {
  name: string;
  match: string;
  winners: number;
  prizeValue: string;
}

export interface LatestDrawResultResponse {
  drawId: number;
  drawDate: string;
  winningNumbers: number[];
  prizePool: string;
  transactionHash: string | null;
  tiers: PrizeTier[];
}

@Injectable()
export class DrawService {
  private readonly logger = new Logger(DrawService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async getJackpotStats(): Promise<JackpotStatsResponse> {
    try {
      const rpcUrl =
        this.configService.get<string>('BSC_RPC_URL') ??
        'https://data-seed-prebsc-1-s1.binance.org:8545';

      const tokenAddress =
        this.configService.get<string>('TOKEN_CONTRACT_ADDRESS') ??
        this.configService.get<string>('JACKPOT_TOKEN_ADDRESS');
      const lotteryAddress = this.configService.get<string>(
        'LOTTERY_CONTRACT_ADDRESS',
      );

      if (!tokenAddress || !lotteryAddress) {
        this.logger.error(
          'TOKEN_CONTRACT_ADDRESS or LOTTERY_CONTRACT_ADDRESS is not configured',
        );
        throw new InternalServerErrorException(
          'Token or lottery address is not configured on the server.',
        );
      }

      const provider = new JsonRpcProvider(rpcUrl);

      const erc20Abi = [
        'function balanceOf(address account) view returns (uint256)',
      ];
      const tokenContract = new Contract(tokenAddress, erc20Abi, provider);

      const balance: bigint = await tokenContract.balanceOf(lotteryAddress);
      const formattedBalance = ethers.formatUnits(balance, 18);

      return {
        tokenAddress,
        lotteryAddress,
        rawBalance: balance.toString(),
        formattedBalance,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch jackpot stats: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException('Failed to fetch jackpot stats');
    }
  }

  async getNextDrawTime(): Promise<NextDrawTimeResponse> {
    try {
      const offsetHours = 7;
      const nowUtc = new Date();
      const nowVn = new Date(nowUtc.getTime() + offsetHours * 60 * 60 * 1000);

      const nextDrawVn = this.computeNextDrawInVietnamTime(nowVn);

      const nextDrawUtcMs = nextDrawVn.getTime() - offsetHours * 60 * 60 * 1000;
      const nextDrawUtc = new Date(nextDrawUtcMs);

      return {
        nextDrawTimestamp: Math.floor(nextDrawUtcMs / 1000),
        nextDrawDateTimeIso: nextDrawUtc.toISOString(),
      };
    } catch (error) {
      this.logger.error(
        `Failed to compute next draw time: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException(
        'Failed to compute next draw time',
      );
    }
  }

  async getRecentWinners(limit = 20): Promise<RecentWinnerResponse[]> {
    try {
      const tickets = await this.prisma.ticket.findMany({
        where: {
          isWinner: true,
        },
        include: {
          user: true,
          draw: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
      });

      return tickets.map((ticket) => {
        const walletAddress = ticket.user?.walletAddress ?? '';
        const maskedWalletAddress = this.maskWalletAddress(walletAddress);
        const draw = ticket.draw;

        return {
          walletAddress,
          maskedWalletAddress,
          drawId: draw ? draw.onChainDrawId : null,
          prizeAmount: draw ? draw.totalPrize : '0',
          updatedAt: ticket.updatedAt.toISOString(),
        };
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch recent winners: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException('Failed to fetch recent winners');
    }
  }

  /**
   * Lịch sử các kỳ quay đã hoàn thành, dùng cho màn hình lịch sử quay thưởng.
   */
  async getDrawHistory(limit = 20): Promise<DrawHistoryItem[]> {
    try {
      const draws = await this.prisma.draw.findMany({
        where: {
          status: 'COMPLETED',
          onChainDrawId: { gte: 0 },
        },
        include: {
          tickets: true,
        },
        orderBy: {
          executedAt: 'desc',
        },
        take: limit,
      });

      return draws.map((draw) => {
        const ticketCount = draw.tickets.length;
        const winnerCount = draw.tickets.filter((t) => t.isWinner).length;

        return {
          id: draw.id,
          onChainDrawId: draw.onChainDrawId,
          winningNumbers: draw.winningNumbers.map(Number).sort((a, b) => a - b),
          totalPrize: draw.totalPrize,
          status: draw.status,
          transactionHash: draw.transactionHash,
          executedAt: draw.executedAt.toISOString(),
          ticketCount,
          winnerCount,
        };
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch draw history: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException('Failed to fetch draw history');
    }
  }

  /**
   * Tính toán kết quả kỳ quay gần nhất có người trúng thưởng (COMPLETED).
   */
  async getLatestDrawResult(): Promise<LatestDrawResultResponse> {
    try {
      // Find the most recent COMPLETED draw
      const latestDraw = await this.prisma.draw.findFirst({
        where: { status: 'COMPLETED', onChainDrawId: { gte: 0 } },
        orderBy: { executedAt: 'desc' },
        include: { tickets: true },
      });

      if (!latestDraw) {
        // Option 1: Throw 404
        // throw new NotFoundException('No completed draws found.');

        // Option 2: Return empty template
        return {
          drawId: 0,
          drawDate: new Date().toISOString(),
          winningNumbers: [],
          prizePool: '0',
          transactionHash: null,
          tiers: [
            { name: 'Jackpot', match: '6 số', winners: 0, prizeValue: '75% Hũ' },
            { name: 'Giải Nhất', match: '5 số', winners: 0, prizeValue: '5000' },
            { name: 'Giải Nhì', match: '4 số', winners: 0, prizeValue: '500' },
            { name: 'Giải Ba', match: '3 số', winners: 0, prizeValue: '50' },
          ],
        };
      }

      let jackpotWinners = 0;
      let firstPrizeWinners = 0;
      let secondPrizeWinners = 0;
      let thirdPrizeWinners = 0;

      const winningNumbers = latestDraw.winningNumbers.map(Number); // Ensure they are numbers

      for (const ticket of latestDraw.tickets) {
        const ticketNumbers = ticket.numbers.map(Number);

        // Count how many numbers match
        const matchingCount = ticketNumbers.filter((num) =>
          winningNumbers.includes(num),
        ).length;

        if (matchingCount === 6) jackpotWinners++;
        else if (matchingCount === 5) firstPrizeWinners++;
        else if (matchingCount === 4) secondPrizeWinners++;
        else if (matchingCount === 3) thirdPrizeWinners++;
      }

      return {
        drawId: latestDraw.onChainDrawId,
        drawDate: latestDraw.executedAt.toISOString(),
        winningNumbers: winningNumbers.sort((a, b) => a - b),
        prizePool: latestDraw.totalPrize, // or any specific formula if needed
        transactionHash: latestDraw.transactionHash,
        tiers: [
          {
            name: 'Jackpot',
            match: '6 số',
            winners: jackpotWinners,
            prizeValue: '75% Hũ',
          },
          {
            name: 'Giải Nhất',
            match: '5 số',
            winners: firstPrizeWinners,
            prizeValue: '5000',
          },
          {
            name: 'Giải Nhì',
            match: '4 số',
            winners: secondPrizeWinners,
            prizeValue: '500',
          },
          {
            name: 'Giải Ba',
            match: '3 số',
            winners: thirdPrizeWinners,
            prizeValue: '50',
          },
        ],
      };
    } catch (error) {
      this.logger.error(
        `Failed to get latest draw result: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException('Failed to fetch latest draw result');
    }
  }

  private computeNextDrawInVietnamTime(current: Date): Date {
    const targetHour = 18;
    const targetMinute = 30;

    const currentHour = current.getUTCHours();
    const currentMinute = current.getUTCMinutes();

    const isAfterDrawTime =
      currentHour > targetHour ||
      (currentHour === targetHour && currentMinute >= targetMinute);

    let daysToAdd = 0;
    if (isAfterDrawTime) {
      daysToAdd = 1;
    }

    const result = new Date(current);
    result.setUTCDate(current.getUTCDate() + daysToAdd);
    result.setUTCHours(targetHour, targetMinute, 0, 0);
    return result;
  }

  private maskWalletAddress(address: string): string {
    if (!address) {
      return '';
    }
    if (address.length <= 10) {
      return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}
