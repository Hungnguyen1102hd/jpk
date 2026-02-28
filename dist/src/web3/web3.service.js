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
var Web3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const prisma_service_1 = require("../prisma/prisma.service");
let Web3Service = Web3Service_1 = class Web3Service {
    prisma;
    configService;
    logger = new common_1.Logger(Web3Service_1.name);
    provider;
    contract;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    onModuleInit() {
        this.initProvider();
        this.listenToEvents();
    }
    initProvider() {
        const rpcUrl = this.configService.get('BSC_RPC_URL') ??
            'https://data-seed-prebsc-1-s1.binance.org:8545';
        this.provider = new ethers_1.ethers.JsonRpcProvider(rpcUrl);
        this.logger.log(`Initialized Web3 Provider with URL: ${rpcUrl}`);
        const contractAddress = this.configService.get('LOTTERY_CONTRACT_ADDRESS') ??
            this.configService.get('CONTRACT_ADDRESS') ??
            ethers_1.ethers.ZeroAddress;
        if (contractAddress === ethers_1.ethers.ZeroAddress) {
            this.logger.warn('LOTTERY_CONTRACT_ADDRESS/CONTRACT_ADDRESS not found in environment variables. Using ZeroAddress fallback.');
        }
        const abi = [
            'event TicketPurchased(address indexed buyer, uint256 ticketId, uint8[6] numbers)',
            'event DrawExecuted(uint256 indexed drawId, uint8[6] winningNumbers, uint256 totalPrize)',
            'function currentDrawId() view returns (uint256)',
            'function drawFinalized(uint256) view returns (bool)',
            'function winningNumbers(uint256, uint256) view returns (uint8)',
        ];
        this.contract = new ethers_1.ethers.Contract(contractAddress, abi, this.provider);
    }
    listenToEvents() {
        this.logger.log('Starting to listen to smart contract events...');
        const handleError = (error) => {
            this.logger.error(`Error in event listener or provider: ${error.message}`);
            setTimeout(() => {
                this.logger.log('Attempting to reconnect...');
                try {
                    void this.contract.removeAllListeners();
                    this.initProvider();
                    this.listenToEvents();
                }
                catch (reconnectErr) {
                    this.logger.error(`Reconnection failed: ${reconnectErr.message}`);
                }
            }, 5000);
        };
        try {
            void this.contract.on('TicketPurchased', (buyer, ticketId, numbers) => {
                void (async () => {
                    try {
                        await this.handleTicketPurchasedEvent(buyer, ticketId, numbers);
                    }
                    catch (err) {
                        this.logger.error(`Error processing TicketPurchased event: ${err.message}`);
                    }
                })();
            });
            void this.contract.on('DrawExecuted', (drawId, winningNumbers, totalPrize) => {
                void (async () => {
                    try {
                        this.logger.log(`DrawExecuted event received: drawId=${drawId}, prize=${totalPrize}`);
                        await this.prisma.draw.create({
                            data: {
                                onChainDrawId: Number(drawId),
                                winningNumbers: Array.from(winningNumbers).map(Number),
                                totalPrize: totalPrize.toString(),
                                status: 'COMPLETED',
                                executedAt: new Date(),
                            },
                        });
                        this.logger.log(`Draw ${drawId} saved to database successfully.`);
                    }
                    catch (err) {
                        this.logger.error(`Error processing DrawExecuted event: ${err.message}`);
                    }
                })();
            });
            void this.provider.on('error', handleError);
        }
        catch (err) {
            handleError(err);
        }
    }
    async backfillTicketsFromEvents(fromBlock, toBlock) {
        if (!Number.isInteger(fromBlock) || fromBlock < 0) {
            throw new Error('fromBlock must be a non-negative integer');
        }
        const endBlock = typeof toBlock === 'number' && toBlock >= fromBlock ? toBlock : undefined;
        this.logger.log(`Starting backfill from block ${fromBlock}${endBlock !== undefined ? ` to block ${endBlock}` : ''}`);
        const filter = this.contract.filters.TicketPurchased();
        const logs = await this.contract.queryFilter(filter, fromBlock, endBlock);
        this.logger.log(`Found ${logs.length} TicketPurchased events to process.`);
        let processed = 0;
        for (const log of logs) {
            const eventLog = log;
            const { buyer, ticketId, numbers } = eventLog.args;
            try {
                await this.handleTicketPurchasedEvent(buyer, ticketId, numbers);
                processed += 1;
            }
            catch (err) {
                this.logger.error(`Failed to backfill ticketId=${ticketId}: ${err.message}`);
            }
        }
        this.logger.log(`Backfill complete. Processed ${processed} events.`);
        return { processed };
    }
    async backfillAllDraws() {
        this.logger.log('Starting draw backfill via direct state read...');
        let processed = 0;
        try {
            const currentDrawIdBigInt = await this.contract.currentDrawId();
            const currentDrawId = Number(currentDrawIdBigInt);
            this.logger.log(`Current Draw ID on contract: ${currentDrawId}`);
            for (let drawId = 0; drawId < currentDrawId; drawId++) {
                const finalized = await this.contract.drawFinalized(drawId);
                if (finalized) {
                    this.logger.log(`Draw ${drawId} is finalized. Fetching winning numbers...`);
                    const numbers = [];
                    for (let i = 0; i < 6; i++) {
                        const num = await this.contract.winningNumbers(drawId, i);
                        numbers.push(Number(num));
                    }
                    await this.prisma.draw.upsert({
                        where: { onChainDrawId: drawId },
                        update: {
                            winningNumbers: numbers,
                            status: 'COMPLETED',
                        },
                        create: {
                            onChainDrawId: drawId,
                            winningNumbers: numbers,
                            totalPrize: '0',
                            status: 'COMPLETED',
                            executedAt: new Date(),
                        },
                    });
                    processed++;
                }
            }
            this.logger.log(`Draw backfill complete. Processed ${processed} finalized draws.`);
            return { processed };
        }
        catch (err) {
            this.logger.error(`Error during state-based draw backfill: ${err.message}`);
            return { processed };
        }
    }
    async backfillTicketFromTxHash(txHash) {
        if (!txHash || !txHash.startsWith('0x') || txHash.length < 66) {
            throw new Error('Invalid txHash');
        }
        this.logger.log(`Backfilling TicketPurchased from tx ${txHash}`);
        const receipt = await this.provider.getTransactionReceipt(txHash);
        if (!receipt) {
            this.logger.warn(`No receipt found for tx ${txHash}`);
            return { processed: 0 };
        }
        const logsForContract = receipt.logs.filter((log) => log.address.toLowerCase() ===
            this.contract.target.toString().toLowerCase());
        let decoded = null;
        for (const log of logsForContract) {
            try {
                const parsed = this.contract.interface.decodeEventLog('TicketPurchased', log.data, log.topics);
                decoded = parsed;
                break;
            }
            catch {
            }
        }
        if (!decoded) {
            this.logger.warn(`No TicketPurchased log found in tx ${txHash}; skipping.`);
            return { processed: 0 };
        }
        await this.handleTicketPurchasedEvent(decoded.buyer, decoded.ticketId, decoded.numbers);
        return { processed: 1 };
    }
    async handleTicketPurchasedEvent(buyer, ticketId, numbers) {
        this.logger.log(`TicketPurchased event received: ticketId=${ticketId}, buyer=${buyer}`);
        const user = await this.prisma.user.upsert({
            where: { walletAddress: buyer.toLowerCase() },
            update: {},
            create: { walletAddress: buyer.toLowerCase() },
        });
        let latestDraw = await this.prisma.draw.findFirst({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' },
        });
        if (!latestDraw) {
            this.logger.warn(`No PENDING draw found for Ticket ID ${ticketId}. Using fallback draw.`);
            latestDraw = await this.prisma.draw.create({
                data: {
                    onChainDrawId: 0,
                    winningNumbers: [],
                    totalPrize: '0',
                    status: 'PENDING',
                    executedAt: new Date(),
                },
            });
        }
        await this.prisma.ticket.upsert({
            where: { onChainTicketId: Number(ticketId) },
            update: {
                numbers: Array.from(numbers).map(Number),
                drawId: latestDraw.id,
                userId: user.id,
            },
            create: {
                onChainTicketId: Number(ticketId),
                numbers: Array.from(numbers).map(Number),
                drawId: latestDraw.id,
                userId: user.id,
            },
        });
        this.logger.log(`Ticket ${ticketId} saved to database successfully.`);
    }
};
exports.Web3Service = Web3Service;
exports.Web3Service = Web3Service = Web3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], Web3Service);
//# sourceMappingURL=web3.service.js.map