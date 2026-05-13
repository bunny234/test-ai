import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Strategy } from '../interfaces/backtest.interfaces';

export class OhlcData {
  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  open: number;

  @IsNotEmpty()
  high: number;

  @IsNotEmpty()
  low: number;

  @IsNotEmpty()
  close: number;
}

export class CreateBacktestDto {
  @IsArray()
  @IsNotEmpty()
  historicalData: OhlcData[];

  @IsObject()
  @IsNotEmpty()
  strategy: Strategy;

  @IsString()
  @IsNotEmpty()
  strategyId: string;
}
