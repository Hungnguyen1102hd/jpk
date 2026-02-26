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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Controller = void 0;
const common_1 = require("@nestjs/common");
const web3_service_1 = require("./web3.service");
let Web3Controller = class Web3Controller {
    web3Service;
    constructor(web3Service) {
        this.web3Service = web3Service;
    }
    async backfillTickets(fromBlockParam, toBlockParam) {
        const fromBlock = Number(fromBlockParam);
        if (!Number.isInteger(fromBlock) || fromBlock < 0) {
            throw new common_1.BadRequestException('Query parameter "fromBlock" is required and must be a non-negative integer.');
        }
        const toBlock = typeof toBlockParam === 'string' && toBlockParam.length > 0
            ? Number(toBlockParam)
            : undefined;
        if (toBlock !== undefined && (!Number.isInteger(toBlock) || toBlock < 0)) {
            throw new common_1.BadRequestException('Query parameter "toBlock", if provided, must be a non-negative integer.');
        }
        return this.web3Service.backfillTicketsFromEvents(fromBlock, toBlock);
    }
    async backfillTicketByTx(txHash) {
        if (!txHash) {
            throw new common_1.BadRequestException('Query parameter "txHash" is required.');
        }
        return this.web3Service.backfillTicketFromTxHash(txHash);
    }
};
exports.Web3Controller = Web3Controller;
__decorate([
    (0, common_1.Get)('backfill-tickets'),
    __param(0, (0, common_1.Query)('fromBlock')),
    __param(1, (0, common_1.Query)('toBlock')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "backfillTickets", null);
__decorate([
    (0, common_1.Get)('backfill-ticket-by-tx'),
    __param(0, (0, common_1.Query)('txHash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "backfillTicketByTx", null);
exports.Web3Controller = Web3Controller = __decorate([
    (0, common_1.Controller)('api/admin'),
    __metadata("design:paramtypes", [web3_service_1.Web3Service])
], Web3Controller);
//# sourceMappingURL=web3.controller.js.map