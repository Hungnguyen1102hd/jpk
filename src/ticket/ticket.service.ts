import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async getTicketsByWallet(walletAddress: string) {
    if (!walletAddress) {
      return [];
    }

    const tickets = await this.prisma.ticket.findMany({
      where: {
        user: {
          walletAddress: {
            equals: walletAddress.toLowerCase(),
            mode: 'insensitive',
          },
        },
      },
      include: {
        draw: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tickets.map((t: any) => ({
      id: t.id,
      ticketId: t.onChainTicketId,
      numbers: t.numbers,
      isWinner: t.isWinner,
      purchasedAt: t.createdAt,
      draw: t.draw
        ? {
            drawId: t.draw.onChainDrawId,
            status: t.draw.status,
            winningNumbers: t.draw.winningNumbers,
            totalPrize: t.draw.totalPrize,
            executedAt: t.draw.executedAt,
          }
        : null,
    }));
  }
}
