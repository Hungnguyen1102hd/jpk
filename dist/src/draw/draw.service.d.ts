import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
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
    tier: string;
    match: number;
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
export declare class DrawService {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    getJackpotStats(): Promise<JackpotStatsResponse>;
    getNextDrawTime(): Promise<NextDrawTimeResponse>;
    getRecentWinners(limit?: number): Promise<RecentWinnerResponse[]>;
    getDrawHistory(limit?: number): Promise<DrawHistoryItem[]>;
    getLatestDrawResult(): Promise<LatestDrawResultResponse>;
    private computeNextDrawInVietnamTime;
    private maskWalletAddress;
}
