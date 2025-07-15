import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Strategy } from './strategy/strategy.entity';
import { StrategyModule } from './strategy/strategy.module';
import { DhanModule } from './dhan/dhan.module';
import { WebhookModule } from './webhook/webhook.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [User, Strategy],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    StrategyModule,
    DhanModule,
    WebhookModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
