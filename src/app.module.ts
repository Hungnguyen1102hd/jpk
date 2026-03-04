import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { Web3Module } from './web3/web3.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { TicketModule } from './ticket/ticket.module';
import { DrawModule } from './draw/draw.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('REDIS_URL') || 'redis://localhost:6379',
        ttl: 60 * 1000, // Default TTL: 60 seconds
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    Web3Module,
    TicketModule,
    DrawModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
