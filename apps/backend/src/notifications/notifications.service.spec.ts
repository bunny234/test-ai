import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import axios from 'axios';

jest.mock('nodemailer');
jest.mock('axios');

describe('NotificationsService', () => {
  let service: NotificationsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SMTP_HOST') return 'smtp.example.com';
              if (key === 'SMTP_PORT') return 587;
              if (key === 'SMTP_USER') return 'user';
              if (key === 'SMTP_PASS') return 'pass';
              if (key === 'EMAIL_FROM') return 'from@example.com';
              if (key === 'TELEGRAM_BOT_TOKEN') return 'token';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email', async () => {
      const sendMail = jest.fn().mockResolvedValue(true);
      (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail });

      await service.sendEmail('to@example.com', 'Test', 'Test');

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'user',
          pass: 'pass',
        },
      });
      expect(sendMail).toHaveBeenCalledWith({
        from: 'from@example.com',
        to: 'to@example.com',
        subject: 'Test',
        text: 'Test',
      });
    });
  });

  describe('sendTelegramMessage', () => {
    it('should send a telegram message', async () => {
      const post = jest.fn().mockResolvedValue({ data: {} });
      (axios.post as jest.Mock) = post;

      await service.sendTelegramMessage('chatId', 'Test');

      expect(post).toHaveBeenCalledWith('https://api.telegram.org/bottoken/sendMessage', {
        chat_id: 'chatId',
        text: 'Test',
      });
    });
  });
});
