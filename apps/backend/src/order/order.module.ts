import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DhanModule } from '../dhan/dhan.module';
import { StrategyModule } from '../strategy/strategy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from '../strategy/strategy.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DhanModule, StrategyModule, UserModule, TypeOrmModule.forFeature([Strategy])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
