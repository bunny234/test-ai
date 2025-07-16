import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DhanService } from './dhan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';
import { SetDhanTokenDto } from './dto/set-dhan-token.dto';
import { PlaceOrderDto } from './dto/place-order.dto';
import { ModifyOrderDto } from './dto/modify-order.dto';

@Controller('dhan')
@UseGuards(JwtAuthGuard)
export class DhanController {
  constructor(private readonly dhanService: DhanService) {}

  @Post('set-token')
  setDhanAccessToken(@Body() setDhanTokenDto: SetDhanTokenDto, @GetUser() user: User) {
    return this.dhanService.setDhanAccessToken(user, setDhanTokenDto.accessToken);
  }

  @Post('orders')
  placeOrder(@Body() placeOrderDto: PlaceOrderDto, @GetUser() user: User) {
    return this.dhanService.placeOrder(user, placeOrderDto);
  }

  @Patch('orders/:id')
  modifyOrder(
    @Param('id') id: string,
    @Body() modifyOrderDto: ModifyOrderDto,
    @GetUser() user: User,
  ) {
    return this.dhanService.modifyOrder(user, id, modifyOrderDto);
  }

  @Delete('orders/:id')
  cancelOrder(@Param('id') id: string, @GetUser() user: User) {
    return this.dhanService.cancelOrder(user, id);
  }
}
