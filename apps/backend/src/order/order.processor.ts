import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UserService } from '../user/user.service';
import { Strategy } from '../strategy/strategy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor('order-queue')
export class OrderProcessor extends WorkerHost {
  private readonly logger = new Logger(OrderProcessor.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly notificationsService: NotificationsService,
    private readonly userService: UserService,
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);
    if (job.name === 'place-order') {
      await this.orderService.placeOrder(job.data);
    }
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed with error: ${error.message}`, error.stack);

    const { data } = job;
    let strategy: Strategy | null = null;

    if (data.strategyId) {
      strategy = await this.strategyRepository.findOne({
        where: { id: data.strategyId },
        relations: ['user'],
      });
    }

    if (!strategy) {
      this.logger.error(`Strategy not found for job ${job.id}`);
      return;
    }

    const user = await this.userService.findUserById(strategy.user.id);
    if (!user) {
      this.logger.error(`User not found for job ${job.id}`);
      return;
    }
    const quantity = data.quantity || 1;

    const message = `Failed to place order for ${data.symbol}: ${data.action} ${quantity}. Reason: ${error.message}`;
    await this.notificationsService.sendEmail(user.email, 'Trade Failed', message);
    if (user.telegramChatId) {
      await this.notificationsService.sendTelegramMessage(user.telegramChatId, message);
    }
  }
}
