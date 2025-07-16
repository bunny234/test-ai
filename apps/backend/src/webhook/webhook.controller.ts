import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Throttle } from '@nestjs/throttler';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Throttle({ default: { limit: 20, ttl: 60000 } })
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
