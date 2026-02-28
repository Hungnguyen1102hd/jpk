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
var DrawService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const ethers_1 = require("ethers");
let DrawService = DrawService_1 = class DrawService {
    prisma;
    configService;
    logger = new common_1.Logger(DrawService_1.name);
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async getJackpotStats() {
        try {
            const rpcUrl = this.configService.get('BSC_RPC_URL') ??
                'https://data-seed-prebsc-1-s1.binance.org:8545';
            const tokenAddress = this.configService.get('TOKEN_CONTRACT_ADDRESS') ??
                this.configService.get('JACKPOT_TOKEN_ADDRESS');
            const lotteryAddress = this.configService.get('LOTTERY_CONTRACT_ADDRESS');
            if (!tokenAddress || !lotteryAddress) {
                this.logger.error('TOKEN_CONTRACT_ADDRESS or LOTTERY_CONTRACT_ADDRESS is not configured');
                throw new common_1.InternalServerErrorException('Token or lottery address is not configured on the server.');
            }
            const provider = new ethers_1.JsonRpcProvider(rpcUrl);
            const erc20Abi = [
                'function balanceOf(address account) view returns (uint256)',
            ];
            const tokenContract = new ethers_1.Contract(tokenAddress, erc20Abi, provider);
            const balance = await tokenContract.balanceOf(lotteryAddress);
            const formattedBalance = ethers_1.ethers.formatUnits(balance, 18);
            return {
                tokenAddress,
                lotteryAddress,
                rawBalance: balance.toString(),
                formattedBalance,
            };
        }
        catch (error) {
            this.logger.error(`Failed to fetch jackpot stats: ${error.message}`);
            throw new common_1.InternalServerErrorException('Failed to fetch jackpot stats');
        }
    }
    async getNextDrawTime() {
        try {
            const offsetHours = 7;
            const nowUtc = new Date();
            const nowVn = new Date(nowUtc.getTime() + offsetHours * 60 * 60 * 1000);
            const nextDrawVn = this.computeNextDrawInVietnamTime(nowVn);
            const nextDrawUtcMs = nextDrawVn.getTime() - offsetHours * 60 * 60 * 1000;
            const nextDrawUtc = new Date(nextDrawUtcMs);
            return {
                nextDrawTimestamp: Math.floor(nextDrawUtcMs / 1000),
                nextDrawDateTimeIso: nextDrawUtc.toISOString(),
            };
        }
        catch (error) {
            this.logger.error(`Failed to compute next draw time: ${error.message}`);
            throw new common_1.InternalServerErrorException('Failed to compute next draw time');
        }
    }
    async getRecentWinners(limit = 20) {
        try {
            const tickets = await this.prisma.ticket.findMany({
                where: {
                    isWinner: true,
                },
                include: {
                    user: true,
                    draw: true,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                take: limit,
            });
            return tickets.map((ticket) => {
                const walletAddress = ticket.user?.walletAddress ?? '';
                const maskedWalletAddress = this.maskWalletAddress(walletAddress);
                const draw = ticket.draw;
                return {
                    walletAddress,
                    maskedWalletAddress,
                    drawId: draw ? draw.onChainDrawId : null,
                    prizeAmount: draw ? draw.totalPrize : '0',
                    updatedAt: ticket.updatedAt.toISOString(),
                };
            });
        }
        catch (error) {
            this.logger.error(`Failed to fetch recent winners: ${error.message}`);
            throw new common_1.InternalServerErrorException('Failed to fetch recent winners');
        }
    }
    async getDrawHistory(limit = 20) {
        try {
            const draws = await this.prisma.draw.findMany({
                where: {
                    status: 'COMPLETED',
                },
                include: {
                    tickets: true,
                },
                orderBy: {
                    executedAt: 'desc',
                },
                take: limit,
            });
            return draws.map((draw) => {
                const ticketCount = draw.tickets.length;
                const winnerCount = draw.tickets.filter((t) => t.isWinner).length;
                return {
                    id: draw.id,
                    onChainDrawId: draw.onChainDrawId,
                    winningNumbers: draw.winningNumbers.map(Number).sort((a, b) => a - b),
                    totalPrize: draw.totalPrize,
                    status: draw.status,
                    executedAt: draw.executedAt.toISOString(),
                    ticketCount,
                    winnerCount,
                };
            });
        }
        catch (error) {
            this.logger.error(`Failed to fetch draw history: ${error.message}`);
            throw new common_1.InternalServerErrorException('Failed to fetch draw history');
        }
    }
    computeNextDrawInVietnamTime(current) {
        const drawDays = [2, 4, 6];
        const targetHour = 18;
        const targetMinute = 30;
        const currentDay = current.getUTCDay();
        const currentHour = current.getUTCHours();
        const currentMinute = current.getUTCMinutes();
        const isDrawDay = drawDays.includes(currentDay);
        const isAfterDrawTime = currentHour > targetHour ||
            (currentHour === targetHour && currentMinute >= targetMinute);
        let daysToAdd = 0;
        if (!isDrawDay || isAfterDrawTime) {
            for (let i = 1; i <= 7; i += 1) {
                const nextDay = (currentDay + i) % 7;
                if (drawDays.includes(nextDay)) {
                    daysToAdd = i;
                    break;
                }
            }
        }
        const result = new Date(current);
        result.setUTCDate(current.getUTCDate() + daysToAdd);
        result.setUTCHours(targetHour, targetMinute, 0, 0);
        return result;
    }
    maskWalletAddress(address) {
        if (!address) {
            return '';
        }
        if (address.length <= 10) {
            return address;
        }
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
};
exports.DrawService = DrawService;
exports.DrawService = DrawService = DrawService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], DrawService);
//# sourceMappingURL=draw.service.js.map