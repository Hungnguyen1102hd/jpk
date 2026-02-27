import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('api/health')
  checkHealth() {
    return {
      status: 'ALIVE',
      timestamp: new Date().toISOString(),
      message: 'Jackpot Backend is awake and listening to BSC Testnet.',
    };
  }
}
