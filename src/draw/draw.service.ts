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
  executedAt: string;
  ticketCount: number;
  winnerCount: number;
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

  private computeNextDrawInVietnamTime(current: Date): Date {
    const drawDays = [2, 4, 6]; // Tue, Thu, Sat (0 = Sun)
    const targetHour = 18;
    const targetMinute = 30;

    const currentDay = current.getUTCDay();
    const currentHour = current.getUTCHours();
    const currentMinute = current.getUTCMinutes();

    const isDrawDay = drawDays.includes(currentDay);
    const isAfterDrawTime =
      currentHour > targetHour ||
      (currentHour === targetHour && currentMinute >= targetMinute);

    let daysToAdd = 0;
    if (!isDrawDay || isAfterDrawTime) {
      for (let i = 1; i <= 7; i += 1) {
        const nextDay = (currentDay + i) % 7;
        if (drawDays.includes(nextDay)) {
          daysToAdd = i;
          break;
        }
      }
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
