import { TicketService } from './ticket.service';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getTicketsByWallet(walletAddress: string): Promise<{
        id: any;
        ticketId: any;
        numbers: any;
        isWinner: any;
        purchasedAt: any;
        draw: {
            drawId: any;
            status: any;
            winningNumbers: any;
            totalPrize: any;
            executedAt: any;
        } | null;
    }[]>;
}
