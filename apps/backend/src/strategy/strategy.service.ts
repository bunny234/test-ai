import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from './strategy.entity';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { User } from '../user/user.entity';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(Strategy)
    private readonly strategyRepository: Repository<Strategy>,
  ) {}

  async create(
    createStrategyDto: CreateStrategyDto,
    user: User,
  ): Promise<Strategy> {
    const strategy = this.strategyRepository.create({
      ...createStrategyDto,
      user,
    });
    return this.strategyRepository.save(strategy);
  }

  async findAll(user: User): Promise<Strategy[]> {
    return this.strategyRepository.find({ where: { user } });
  }

  async findOne(id: number, user: User): Promise<Strategy | null> {
    return this.strategyRepository.findOne({ where: { id, user } });
  }

  async update(
    id: number,
    updateStrategyDto: UpdateStrategyDto,
    user: User,
  ): Promise<Strategy | null> {
    await this.strategyRepository.update({ id, user }, updateStrategyDto);
    return this.findOne(id, user);
  }

  async remove(id: number, user: User): Promise<void> {
    await this.strategyRepository.delete({ id, user });
  }
}
