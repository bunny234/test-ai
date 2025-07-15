import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DhanService } from './dhan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { SetDhanTokenDto } from './dto/set-dhan-token.dto';
import { PlaceOrderDto } from './dto/place-order.dto';
import { ModifyOrderDto } from './dto/modify-order.dto';

@Controller('dhan')
@UseGuards(JwtAuthGuard)
export class DhanController {
  constructor(private readonly dhanService: DhanService) {}

  @Post('set-token')
  setDhanAccessToken(@Body() setDhanTokenDto: SetDhanTokenDto, @Request() req) {
    return this.dhanService.setDhanAccessToken(req.user as User, setDhanTokenDto.accessToken);
  }

  @Post('orders')
  placeOrder(@Body() placeOrderDto: PlaceOrderDto, @Request() req) {
    return this.dhanService.placeOrder(req.user as User, placeOrderDto);
  }

  @Patch('orders/:id')
  modifyOrder(
    @Param('id') id: string,
    @Body() modifyOrderDto: ModifyOrderDto,
    @Request() req,
  ) {
    return this.dhanService.modifyOrder(req.user as User, id, modifyOrderDto);
  }

  @Delete('orders/:id')
  cancelOrder(@Param('id') id: string, @Request() req) {
    return this.dhanService.cancelOrder(req.user as User, id);
  }
}
