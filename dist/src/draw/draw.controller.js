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
exports.DrawController = void 0;
const common_1 = require("@nestjs/common");
const draw_service_1 = require("./draw.service");
let DrawController = class DrawController {
    drawService;
    constructor(drawService) {
        this.drawService = drawService;
    }
    getJackpotStats() {
        return this.drawService.getJackpotStats();
    }
    getNextDrawTime() {
        return this.drawService.getNextDrawTime();
    }
    getRecentWinners(limit) {
        const parsedLimit = Number.isNaN(Number(limit)) ? undefined : Number(limit);
        return this.drawService.getRecentWinners(parsedLimit);
    }
    getDrawHistory(limit) {
        const parsedLimit = Number.isNaN(Number(limit)) ? undefined : Number(limit);
        return this.drawService.getDrawHistory(parsedLimit);
    }
};
exports.DrawController = DrawController;
__decorate([
    (0, common_1.Get)('jackpot/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "getJackpotStats", null);
__decorate([
    (0, common_1.Get)('draws/next-time'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "getNextDrawTime", null);
__decorate([
    (0, common_1.Get)('draws/recent-winners'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "getRecentWinners", null);
__decorate([
    (0, common_1.Get)('draws/history'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawController.prototype, "getDrawHistory", null);
exports.DrawController = DrawController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [draw_service_1.DrawService])
], DrawController);
//# sourceMappingURL=draw.controller.js.map