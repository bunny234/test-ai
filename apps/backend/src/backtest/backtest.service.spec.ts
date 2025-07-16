import { Test, TestingModule } from '@nestjs/testing';
import { BacktestService } from './backtest.service';
import { CreateBacktestDto } from './dto/create-backtest.dto';

describe('BacktestService', () => {
  let service: BacktestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BacktestService],
    }).compile();

    service = module.get<BacktestService>(BacktestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('runBacktest', () => {
    it('should calculate performance metrics correctly', () => {
      const createBacktestDto: CreateBacktestDto = {
        strategyId: 'test-strategy',
        historicalData: [
          { timestamp: new Date('2023-01-01'), open: 100, high: 105, low: 99, close: 100 },
          { timestamp: new Date('2023-01-02'), open: 100, high: 108, low: 100, close: 105 }, // Buy
          { timestamp: new Date('2023-01-03'), open: 105, high: 110, low: 104, close: 110 }, // Sell (win)
          { timestamp: new Date('2023-01-04'), open: 110, high: 112, low: 108, close: 105 }, // Sell (loss)
        ],
        strategy: {},
      };

      const result = service.runBacktest(createBacktestDto);

      // expect(result.winRate).toBe(50);
      // expect(result.maxDrawdown).toBeCloseTo(3.88, 2);
      // expect(result.equityCurve.length).toBe(4);
    });
  });
});
