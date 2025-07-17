import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('tradingview')
  @HttpCode(200)
  async handleTradingViewWebhook(@Body() payload: any) {
    console.log('Received TradingView webhook payload:', payload);
    // A simple authentication mechanism
    if (payload.secret !== 'your-secret-token') {
      throw new UnauthorizedException('Invalid secret token');
    }
    this.webhookService.processWebhook(payload);
  }
}
