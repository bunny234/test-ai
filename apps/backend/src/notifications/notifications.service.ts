import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendTelegramMessage(chatId: string, text: string) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text,
    });
  }
}
