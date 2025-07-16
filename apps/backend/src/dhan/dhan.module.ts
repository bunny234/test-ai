import { Module } from '@nestjs/common';
import { MarketDataModule } from '../market-data/market-data.module';
import { UserModule } from '../user/user.module';
import { DhanController } from './dhan.controller';
import { DhanService } from './dhan.service';

@Module({
  imports: [UserModule, MarketDataModule],
  providers: [DhanService],
  controllers: [DhanController],
  exports: [DhanService],
})
export class DhanModule {}
