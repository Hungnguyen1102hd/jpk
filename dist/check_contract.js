"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const provider = new ethers_1.ethers.JsonRpcProvider(process.env.BSC_RPC_URL);
const abi = [
    'function currentDrawId() view returns (uint256)',
    'function drawFinalized(uint256) view returns (bool)',
];
async function main() {
    const contract = new ethers_1.ethers.Contract(process.env.LOTTERY_CONTRACT_ADDRESS, abi, provider);
    const currentDrawId = await contract.currentDrawId();
    console.log('Current drawId:', currentDrawId.toString());
    if (currentDrawId > 0n) {
        const finalized = await contract.drawFinalized(0n);
        console.log('Is draw 0 finalized?', finalized);
        if (currentDrawId > 1n) {
            const finalized1 = await contract.drawFinalized(1n);
            console.log('Is draw 1 finalized?', finalized1);
        }
    }
}
main().catch(console.error);
//# sourceMappingURL=check_contract.js.map