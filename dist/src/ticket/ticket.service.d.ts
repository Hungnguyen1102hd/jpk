import { PrismaService } from '../prisma/prisma.service';
export declare class TicketService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
