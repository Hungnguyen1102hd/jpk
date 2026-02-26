import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class DrawScheduler implements OnModuleInit {
  private readonly logger = new Logger(DrawScheduler.name);
  private hasExecutedInCurrentWindow = false;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const enabled =
      this.configService.get<string>('ENABLE_AUTO_DRAW') === 'true';

    if (!enabled) {
      this.logger.log('Auto draw scheduler is disabled (ENABLE_AUTO_DRAW != true).');
      return;
    }

    this.logger.log('Starting auto draw scheduler (checks every 60 seconds).');
    setInterval(() => {
      void this.tick();
    }, 60_000);
  }

  private async tick() {
    try {
      const nowUtc = new Date();
      const vnOffsetHours = 7;
      const nowVn = new Date(
        nowUtc.getTime() + vnOffsetHours * 60 * 60 * 1000,
      );

      if (!this.isDrawWindow(nowVn)) {
        // Reset flag when outside the draw window so the next window can execute again.
        if (this.hasExecutedInCurrentWindow) {
          this.logger.debug('Leaving draw window, reset execution flag.');
        }
        this.hasExecutedInCurrentWindow = false;
        return;
      }

      if (this.hasExecutedInCurrentWindow) {
        return;
      }

      this.logger.log(
        `Draw window reached at (VN time): ${nowVn.toISOString()}. Triggering executeDraw().`,
      );

      await this.executeOnChainDraw();
      this.hasExecutedInCurrentWindow = true;
    } catch (error) {
      this.logger.error(
        `Auto draw scheduler error: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Draw schedule: 18:30 (UTC+7) on Tue / Thu / Sat.
   * We consider a small execution window of [18:30, 18:40).
   */
  private isDrawWindow(nowVn: Date): boolean {
    const drawDays = [2, 4, 6]; // Tue(2), Thu(4), Sat(6) in JS getUTCDay when shifted to VN time.

    const day = nowVn.getUTCDay();
    const hour = nowVn.getUTCHours();
    const minute = nowVn.getUTCMinutes();

    if (!drawDays.includes(day)) {
      return false;
    }

    const minutesOfDay = hour * 60 + minute;
    const windowStart = 18 * 60 + 30; // 18:30
    const windowEnd = 18 * 60 + 40; // 18:40

    return minutesOfDay >= windowStart && minutesOfDay < windowEnd;
  }

  private async executeOnChainDraw() {
    const rpcUrl =
      this.configService.get<string>('BSC_RPC_URL') ??
      'https://data-seed-prebsc-1-s1.binance.org:8545';
    const lotteryAddress =
      this.configService.get<string>('LOTTERY_CONTRACT_ADDRESS');
    const privateKey =
      this.configService.get<string>('DRAW_EXECUTOR_PRIVATE_KEY');

    if (!lotteryAddress) {
      this.logger.error(
        'LOTTERY_CONTRACT_ADDRESS is not configured; cannot execute draw.',
      );
      return;
    }

    if (!privateKey) {
      this.logger.error(
        'DRAW_EXECUTOR_PRIVATE_KEY is not configured; cannot execute draw.',
      );
      return;
    }

    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privateKey, provider);

    const abi = ['function executeDraw()'];
    const contract = new Contract(lotteryAddress, abi, wallet);

    try {
      const tx = await contract.executeDraw();
      this.logger.log(
        `Submitted executeDraw transaction. Hash: ${tx.hash}`,
      );
      const receipt = await tx.wait();
      this.logger.log(
        `executeDraw transaction confirmed in block ${receipt.blockNumber}.`,
      );
    } catch (error) {
      this.logger.error(
        `executeDraw transaction failed: ${(error as Error).message}`,
      );
    }
  }
}

