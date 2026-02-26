import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class DrawScheduler implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private hasExecutedInCurrentWindow;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private tick;
    private isDrawWindow;
    private executeOnChainDraw;
}
