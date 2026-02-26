"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DrawScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawScheduler = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
let DrawScheduler = DrawScheduler_1 = class DrawScheduler {
    configService;
    logger = new common_1.Logger(DrawScheduler_1.name);
    hasExecutedInCurrentWindow = false;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const enabled = this.configService.get('ENABLE_AUTO_DRAW') === 'true';
        if (!enabled) {
            this.logger.log('Auto draw scheduler is disabled (ENABLE_AUTO_DRAW != true).');
            return;
        }
        this.logger.log('Starting auto draw scheduler (checks every 60 seconds).');
        setInterval(() => {
            void this.tick();
        }, 60_000);
    }
    async tick() {
        try {
            const nowUtc = new Date();
            const vnOffsetHours = 7;
            const nowVn = new Date(nowUtc.getTime() + vnOffsetHours * 60 * 60 * 1000);
            if (!this.isDrawWindow(nowVn)) {
                if (this.hasExecutedInCurrentWindow) {
                    this.logger.debug('Leaving draw window, reset execution flag.');
                }
                this.hasExecutedInCurrentWindow = false;
                return;
            }
            if (this.hasExecutedInCurrentWindow) {
                return;
            }
            this.logger.log(`Draw window reached at (VN time): ${nowVn.toISOString()}. Triggering executeDraw().`);
            await this.executeOnChainDraw();
            this.hasExecutedInCurrentWindow = true;
        }
        catch (error) {
            this.logger.error(`Auto draw scheduler error: ${error.message}`);
        }
    }
    isDrawWindow(nowVn) {
        const drawDays = [2, 4, 6];
        const day = nowVn.getUTCDay();
        const hour = nowVn.getUTCHours();
        const minute = nowVn.getUTCMinutes();
        if (!drawDays.includes(day)) {
            return false;
        }
        const minutesOfDay = hour * 60 + minute;
        const windowStart = 18 * 60 + 30;
        const windowEnd = 18 * 60 + 40;
        return minutesOfDay >= windowStart && minutesOfDay < windowEnd;
    }
    async executeOnChainDraw() {
        const rpcUrl = this.configService.get('BSC_RPC_URL') ??
            'https://data-seed-prebsc-1-s1.binance.org:8545';
        const lotteryAddress = this.configService.get('LOTTERY_CONTRACT_ADDRESS');
        const privateKey = this.configService.get('DRAW_EXECUTOR_PRIVATE_KEY');
        if (!lotteryAddress) {
            this.logger.error('LOTTERY_CONTRACT_ADDRESS is not configured; cannot execute draw.');
            return;
        }
        if (!privateKey) {
            this.logger.error('DRAW_EXECUTOR_PRIVATE_KEY is not configured; cannot execute draw.');
            return;
        }
        const provider = new ethers_1.JsonRpcProvider(rpcUrl);
        const wallet = new ethers_1.Wallet(privateKey, provider);
        const abi = ['function executeDraw()'];
        const contract = new ethers_1.Contract(lotteryAddress, abi, wallet);
        try {
            const tx = await contract.executeDraw();
            this.logger.log(`Submitted executeDraw transaction. Hash: ${tx.hash}`);
            const receipt = await tx.wait();
            this.logger.log(`executeDraw transaction confirmed in block ${receipt.blockNumber}.`);
        }
        catch (error) {
            this.logger.error(`executeDraw transaction failed: ${error.message}`);
        }
    }
};
exports.DrawScheduler = DrawScheduler;
exports.DrawScheduler = DrawScheduler = DrawScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DrawScheduler);
//# sourceMappingURL=draw.scheduler.js.map