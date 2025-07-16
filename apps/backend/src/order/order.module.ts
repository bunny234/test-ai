import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DhanModule } from '../dhan/dhan.module';
import { StrategyModule } from '../strategy/strategy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from '../strategy/strategy.entity';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bullmq';
import { OrderProcessor } from './order.processor';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    DhanModule,
    StrategyModule,
    UserModule,
    TypeOrmModule.forFeature([Strategy]),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
    NotificationsModule,
  ],
  providers: [OrderService, OrderProcessor],
  exports: [OrderService],
})
export class OrderModule {}
