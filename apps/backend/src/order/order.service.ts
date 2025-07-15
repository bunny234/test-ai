import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from '../strategy/strategy.entity';
import { DhanService } from '../dhan/dhan.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
    private readonly dhanService: DhanService,
    private readonly userService: UserService,
  ) {}

  async placeOrderFromWebhook(data: {
    strategyId?: number;
    symbol?: string;
    action: 'buy' | 'sell';
    price?: number;
    quantity?: number;
  }) {
    this.logger.log(`Placing order from webhook: ${JSON.stringify(data)}`);

    let strategy: Strategy;

    if (data.strategyId) {
      strategy = await this.strategyRepository.findOne({ where: { id: data.strategyId }, relations: ['user'] });
    } else if (data.symbol) {
      strategy = await this.strategyRepository.findOne({ where: { symbol: data.symbol }, relations: ['user'] });
    }

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    const user = await this.userService.findUserById(strategy.user.id);

    // Position sizing logic
    const quantity = data.quantity || this.calculatePositionSize(strategy);

    const orderDetails = {
      symbol: strategy.symbol,
      exchange: 'NSE', // Or get from strategy
      transactionType: data.action.toUpperCase(),
      orderType: 'MARKET', // Or get from strategy
      quantity,
      price: data.price || 0,
      // Add other required Dhan API parameters
    };

    try {
      this.logger.log(`Placing order with Dhan: ${JSON.stringify(orderDetails)}`);
      const orderResponse = await this.dhanService.placeOrder(user, orderDetails);
      this.logger.log(`Order placed successfully: ${JSON.stringify(orderResponse)}`);
      return orderResponse;
    } catch (error) {
      this.logger.error(`Failed to place order: ${error.message}`, error.stack);
      throw error;
    }
  }

  private calculatePositionSize(strategy: Strategy): number {
    // Implement your position sizing logic here
    // For example, risk a certain percentage of capital
    // This is a placeholder
    return strategy.quantity;
  }
}
