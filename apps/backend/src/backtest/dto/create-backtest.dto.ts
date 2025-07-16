import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

class OhlcData {
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
  strategy: object;

  @IsString()
  @IsNotEmpty()
  strategyId: string;
}
