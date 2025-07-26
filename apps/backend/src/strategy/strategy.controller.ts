import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { StrategyService } from './strategy.service';

@Controller('strategies')
@UseGuards(JwtAuthGuard)
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Throttle(10, 60)
  @Post()
  create(@Body() createStrategyDto: CreateStrategyDto, @Request() req) {
    return this.strategyService.create(createStrategyDto, req.user as User);
  }

  @Get()
  findAll(@Request() req) {
    return this.strategyService.findAll(req.user as User);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const strategy = await this.strategyService.findOne(+id, req.user as User);
    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }
    return strategy;
  }

  @Throttle(10, 60)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStrategyDto: UpdateStrategyDto,
    @Request() req,
  ) {
    const strategy = await this.strategyService.update(
      +id,
      updateStrategyDto,
      req.user as User,
    );
    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }
    return strategy;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.strategyService.remove(+id, req.user as User);
  }
}
