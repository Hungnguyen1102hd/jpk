import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawController } from './draw.controller';
import { DrawScheduler } from './draw.scheduler';

@Module({
  providers: [DrawService, DrawScheduler],
  controllers: [DrawController],
})
export class DrawModule {}

