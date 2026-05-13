import { Controller, Post, Body } from '@nestjs/common';
import { BacktestService } from './backtest.service';
import { CreateBacktestDto } from './dto/create-backtest.dto';

@Controller('backtest')
export class BacktestController {
  constructor(private readonly backtestService: BacktestService) {}

  @Post()
  runBacktest(@Body() createBacktestDto: CreateBacktestDto) {
    return this.backtestService.runBacktest(createBacktestDto);
  }
}
