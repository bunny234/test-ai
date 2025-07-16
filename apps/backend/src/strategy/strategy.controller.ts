import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';

@Controller('strategies')
@UseGuards(JwtAuthGuard)
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStrategyDto: UpdateStrategyDto,
    @Request() req,
  ) {
    const strategy = await this.strategyService.update(+id, updateStrategyDto, req.user as User);
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
