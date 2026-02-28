import { Web3Service } from './web3.service';
export declare class Web3Controller {
    private readonly web3Service;
    constructor(web3Service: Web3Service);
    backfillTickets(fromBlockParam?: string, toBlockParam?: string): Promise<{
        processed: number;
    }>;
    backfillDraws(fromBlockParam?: string, toBlockParam?: string): Promise<{
        processed: number;
    }>;
    backfillTicketByTx(txHash?: string): Promise<{
        processed: number;
    }>;
    backfillDrawByTx(txHash?: string): Promise<{
        processed: number;
    }>;
}
