import { OhlcData } from '../dto/create-backtest.dto';

export interface Strategy {
  name: string;
  buyCondition: (currentPrice: OhlcData, previousPrice: OhlcData) => boolean;
  sellCondition: (currentPrice: OhlcData, previousPrice: OhlcData) => boolean;
}

export interface Trade {
  entryPrice: number;
  exitPrice: number | null;
  timestamp: Date;
}

export interface BacktestResult {
  trades: Trade[];
  winRate: number;
  maxDrawdown: number;
  equityCurve: number[];
}
