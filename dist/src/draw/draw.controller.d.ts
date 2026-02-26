import { DrawService } from './draw.service';
export declare class DrawController {
    private readonly drawService;
    constructor(drawService: DrawService);
    getJackpotStats(): Promise<import("./draw.service").JackpotStatsResponse>;
    getNextDrawTime(): Promise<import("./draw.service").NextDrawTimeResponse>;
    getRecentWinners(limit?: string): Promise<import("./draw.service").RecentWinnerResponse[]>;
    getDrawHistory(limit?: string): Promise<import("./draw.service").DrawHistoryItem[]>;
}
