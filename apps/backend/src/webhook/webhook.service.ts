import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from '../order/order.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly orderService: OrderService) {}

  async processWebhook(payload: any) {
    this.logger.log(`Processing webhook payload: ${JSON.stringify(payload)}`);
    try {
      // Extract strategy ID or symbol and other relevant data from the payload
      const { strategyId, symbol, action, price, quantity } = payload;

      if (!strategyId && !symbol) {
        this.logger.error('Strategy ID or symbol not found in webhook payload');
        return;
      }

      // Call the OrderService to place the order
      await this.orderService.placeOrderFromWebhook({
        strategyId,
        symbol,
        action,
        price,
        quantity,
      });
    } catch (error) {
      this.logger.error(
        `Failed to process webhook: ${error.message}`,
        error.stack,
      );
    }
  }
}
