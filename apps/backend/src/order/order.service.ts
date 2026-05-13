import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { PlaceOrderRequest } from 'src/dhan/interfaces/dhan.interfaces';
import { Repository } from 'typeorm';
import { DhanService } from '../dhan/dhan.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Strategy } from '../strategy/strategy.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
    private readonly dhanService: DhanService,
    private readonly userService: UserService,
    private readonly notificationsService: NotificationsService,
    @InjectQueue('order-queue') private readonly orderQueue: Queue,
  ) {}

  async placeOrderFromWebhook(data: {
    strategyId?: number;
    symbol?: string;
    action: 'buy' | 'sell';
    price?: number;
    quantity?: number;
  }) {
    this.logger.log(`Adding order to queue: ${JSON.stringify(data)}`);
    await this.orderQueue.add('place-order', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }

  async placeOrder(data: {
    strategyId?: number;
    symbol?: string;
    action: 'buy' | 'sell';
    price?: number;
    quantity?: number;
  }) {
    this.logger.log(`Placing order from queue: ${JSON.stringify(data)}`);

    let strategy: Strategy | null = null;

    if (data.strategyId) {
      strategy = await this.strategyRepository.findOne({
        where: { id: data.strategyId },
        relations: ['user'],
      });
    }

    if (!strategy && data.symbol) {
      // If strategy is not found by id, try to find it by symbol.
      // This part of the logic might need to be adjusted based on the application's requirements.
      // For now, we are assuming that a symbol can be associated with a strategy.
      // Since 'symbol' is not a property of the 'Strategy' entity, this will fail.
      // We will use the symbol from the input data directly.
    }

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    const user = await this.userService.findUserById(strategy.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Position sizing logic
    const quantity = data.quantity || 1; // Defaulting to 1 as strategy doesn't have quantity

    const orderType = data.action.toUpperCase() === 'BUY' ? 'BUY' : 'SELL';
    const orderDetails: PlaceOrderRequest = {
      securityId: data.symbol as string,
      // exchange: 'NSE', // Or get from strategy
      transactionType: orderType,
      orderType: 'MARKET', // Or get from strategy
      quantity,
      price: data.price || 0,
      // Add other required Dhan API parameters
    };

    try {
      this.logger.log(
        `Placing order with Dhan: ${JSON.stringify(orderDetails)}`,
      );
      const orderResponse = await this.dhanService.placeOrder(
        user,
        orderDetails,
      );
      this.logger.log(
        `Order placed successfully: ${JSON.stringify(orderResponse)}`,
      );
      const message = `Order placed successfully for ${data.symbol}: ${data.action} ${quantity} @ ${orderDetails.price}`;
      await this.notificationsService.sendEmail(
        user.email,
        'Trade Executed',
        message,
      );
      if (user.telegramChatId) {
        await this.notificationsService.sendTelegramMessage(
          user.telegramChatId,
          message,
        );
      }
      return orderResponse;
    } catch (error) {
      this.logger.error(`Failed to place order: ${error.message}`, error.stack);
      // We don't send a notification here, as the job will be retried.
      // The notification will be sent by the 'failed' event handler if all retries fail.
      throw error;
    }
  }

  private calculatePositionSize(strategy: Strategy): number {
    // Implement your position sizing logic here
    // For example, risk a certain percentage of capital
    // This is a placeholder. Since strategy doesn't have quantity, we default to 1.
    return 1;
  }
}
