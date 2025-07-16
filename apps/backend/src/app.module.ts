import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Strategy } from './strategy/strategy.entity';
import { Trade } from './trade/trade.entity';
import { StrategyModule } from './strategy/strategy.module';
import { DhanModule } from './dhan/dhan.module';
import { WebhookModule } from './webhook/webhook.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { TradeModule } from './trade/trade.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
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
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
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
