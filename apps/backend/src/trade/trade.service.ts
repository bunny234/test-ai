import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade, TradeSide } from './trade.entity';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,
  ) {}

  async getPnl(userId: number) {
    const trades = await this.tradeRepository.find({
      where: { user: { id: userId } },
    });

    let totalPnl = 0;
    for (const trade of trades) {
      if (trade.pnl) {
        totalPnl += Number(trade.pnl);
      }
    }

    return { totalPnl };
  }

  async getMetrics(userId: number) {
    const trades = await this.tradeRepository.find({
      where: { user: { id: userId } },
      relations: ['strategy'],
    });

    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => t.pnl > 0).length;
    const losingTrades = trades.filter(t => t.pnl < 0).length;

    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    const totalProfit = trades
      .filter(t => t.pnl > 0)
      .reduce((sum, t) => sum + Number(t.pnl), 0);
    const totalLoss = trades
      .filter(t => t.pnl < 0)
      .reduce((sum, t) => sum + Number(t.pnl), 0);

    const averageProfit =
      winningTrades > 0 ? totalProfit / winningTrades : 0;
    const averageLoss = losingTrades > 0 ? totalLoss / losingTrades : 0;

    const strategyPerformance = {};
    for (const trade of trades) {
      const strategyName = trade.strategy.name;
      if (!strategyPerformance[strategyName]) {
        strategyPerformance[strategyName] = {
          totalPnl: 0,
          totalTrades: 0,
        };
      }
      strategyPerformance[strategyName].totalPnl += Number(trade.pnl);
      strategyPerformance[strategyName].totalTrades++;
    }

    return {
      totalTrades,
      winningTrades,
      losingTrades,
      winRate,
      averageProfit,
      averageLoss,
      strategyPerformance,
    };
  }
}
