import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TradeService } from './trade.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get('pnl/:userId')
  getPnl(@Param('userId') userId: number) {
    return this.tradeService.getPnl(userId);
  }

  @Get('metrics/:userId')
  getMetrics(@Param('userId') userId: number) {
    return this.tradeService.getMetrics(userId);
  }
}
