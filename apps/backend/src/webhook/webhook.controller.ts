import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

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
