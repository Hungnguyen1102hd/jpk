import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { DrawService } from './draw.service';

@Controller('api')
@UseInterceptors(CacheInterceptor)
export class DrawController {
  constructor(private readonly drawService: DrawService) { }

  // 1. Jackpot Pool stats
  @Get('jackpot/stats')
  @CacheTTL(30 * 1000) // Cache 30 seconds since we query the smart contract dynamically
  getJackpotStats() {
    return this.drawService.getJackpotStats();
  }

  // 2. Next draw time
  @Get('draws/next-time')
  @CacheTTL(60 * 60 * 1000) // Cache 1 hour, logic is mostly static
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

  // 5. Latest draw result for homepage
  @Get('draws/latest-result')
  @CacheTTL(60 * 1000) // Cache 60 seconds
  getLatestDrawResult() {
    return this.drawService.getLatestDrawResult();
  }
}
