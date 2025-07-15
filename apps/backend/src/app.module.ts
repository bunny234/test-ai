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

@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          SMTP_HOST: process.env.SMTP_HOST,
          SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
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
  providers: [AppService],
})
export class AppModule {}
