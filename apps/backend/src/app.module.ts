import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BacktestModule } from './backtest/backtest.module';
import { DhanModule } from './dhan/dhan.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrderModule } from './order/order.module';
import { Strategy } from './strategy/strategy.entity';
import { StrategyModule } from './strategy/strategy.module';
import { Trade } from './trade/trade.entity';
import { TradeModule } from './trade/trade.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    BacktestModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
          SMTP_USER: process.env.SMTP_USER,
          SMTP_PASS: process.env.SMTP_PASS,
          EMAIL_FROM: process.env.EMAIL_FROM,
          TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string) || 5432,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'mydatabase',
      entities: [User, Strategy, Trade],
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    StrategyModule,
    DhanModule,
    WebhookModule,
    OrderModule,
    TradeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
