import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStrategyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  instrument: string;

  @IsString()
  @IsNotEmpty()
  timeframe: string;

  @IsString()
  @IsNotEmpty()
  indicator: string;
}
