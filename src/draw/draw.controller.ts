import { Controller, Get, Query } from '@nestjs/common';
import { DrawService } from './draw.service';

@Controller('api')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  // 1. Jackpot Pool stats
  @Get('jackpot/stats')
  getJackpotStats() {
    return this.drawService.getJackpotStats();
  }

  // 2. Next draw time
  @Get('draws/next-time')
  getNextDrawTime() {
    return this.drawService.getNextDrawTime();
  }

  // 3. Recent winners ticker
  @Get('draws/recent-winners')
  getRecentWinners(@Query('limit') limit?: string) {
    const parsedLimit = Number.isNaN(Number(limit)) ? undefined : Number(limit);
    return this.drawService.getRecentWinners(parsedLimit);
  }

  // 4. Draw history list (completed draws)
  @Get('draws/history')
  getDrawHistory(@Query('limit') limit?: string) {
    const parsedLimit = Number.isNaN(Number(limit)) ? undefined : Number(limit);
    return this.drawService.getDrawHistory(parsedLimit);
  }
}
