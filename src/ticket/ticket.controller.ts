import { Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':walletAddress')
  async getTicketsByWallet(@Param('walletAddress') walletAddress: string) {
    return this.ticketService.getTicketsByWallet(walletAddress);
  }
}
