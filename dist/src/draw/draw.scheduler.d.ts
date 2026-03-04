import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3Service } from '../web3/web3.service';
export declare class DrawScheduler implements OnModuleInit {
    private readonly configService;
    private readonly web3Service;
    private readonly logger;
    private hasExecutedInCurrentWindow;
    constructor(configService: ConfigService, web3Service: Web3Service);
    onModuleInit(): void;
    private tick;
    private isDrawWindow;
    private executeOnChainDraw;
}
