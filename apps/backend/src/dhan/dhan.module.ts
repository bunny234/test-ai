import { Module } from '@nestjs/common';
import { DhanService } from './dhan.service';
import { DhanController } from './dhan.controller';
import { UserModule } from '../user/user.module';
import { MarketDataModule } from '../market-data/market-data.module';

@Module({
  imports: [UserModule, MarketDataModule],
  providers: [DhanService],
  controllers: [DhanController],
})
export class DhanModule {}
