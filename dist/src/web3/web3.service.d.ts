import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class Web3Service implements OnModuleInit {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    private provider;
    private contract;
    constructor(prisma: PrismaService, configService: ConfigService);
    onModuleInit(): void;
    private initProvider;
    private listenToEvents;
    backfillTicketsFromEvents(fromBlock: number, toBlock?: number): Promise<{
        processed: number;
    }>;
    backfillDrawsFromEvents(fromBlock: number, toBlock?: number): Promise<{
        processed: number;
    }>;
    backfillDrawFromTxHash(txHash: string): Promise<{
        processed: number;
    }>;
    backfillTicketFromTxHash(txHash: string): Promise<{
        processed: number;
    }>;
    private handleTicketPurchasedEvent;
}
