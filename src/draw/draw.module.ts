import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawController } from './draw.controller';
import { DrawScheduler } from './draw.scheduler';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  providers: [DrawService, DrawScheduler],
  controllers: [DrawController],
})
export class DrawModule { }
