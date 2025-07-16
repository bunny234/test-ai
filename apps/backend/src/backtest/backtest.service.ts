import { Injectable } from '@nestjs/common';
import { CreateBacktestDto } from './dto/create-backtest.dto';

@Injectable()
export class BacktestService {
  runBacktest(createBacktestDto: CreateBacktestDto) {
    const { historicalData, strategy } = createBacktestDto;
    const trades = [];
    let equity = 100000; // Starting equity
    const equityCurve = [equity];
    let peakEquity = equity;
    let maxDrawdown = 0;

    for (let i = 1; i < historicalData.length; i++) {
      const currentPrice = historicalData[i];
      const previousPrice = historicalData[i - 1];

      // Replace with actual strategy logic
      const shouldBuy = this.shouldBuy(strategy, currentPrice, previousPrice);
      const shouldSell = this.shouldSell(strategy, currentPrice, previousPrice);

      if (shouldBuy) {
        const trade = {
          entryPrice: currentPrice.close,
          exitPrice: null,
          timestamp: currentPrice.timestamp,
        };
        trades.push(trade);
        equity -= currentPrice.close;
      } else if (shouldSell && trades.length > 0) {
        const lastTrade = trades[trades.length - 1];
        if (lastTrade.exitPrice === null) {
          lastTrade.exitPrice = currentPrice.close;
          equity += currentPrice.close;
        }
      }

      equityCurve.push(equity);
      if (equity > peakEquity) {
        peakEquity = equity;
      }
      const drawdown = ((peakEquity - equity) / peakEquity) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    const winRate = this.calculateWinRate(trades);

    return {
      trades,
      winRate,
      maxDrawdown,
      equityCurve,
    };
  }

  private shouldBuy(strategy: any, currentPrice: any, previousPrice: any): boolean {
    // Implement strategy-specific buy logic here
    // This is a placeholder
    return currentPrice.close > previousPrice.close;
  }

  private shouldSell(strategy: any, currentPrice: any, previousPrice: any): boolean {
    // Implement strategy-specific sell logic here
    // This is a placeholder
    return currentPrice.close < previousPrice.close;
  }

  private calculateWinRate(trades: any[]): number {
    const winningTrades = trades.filter(
      (trade) => trade.exitPrice > trade.entryPrice,
    );
    return (winningTrades.length / trades.length) * 100;
  }
}
