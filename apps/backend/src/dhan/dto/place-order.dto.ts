import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}

export class PlaceOrderDto {
  @IsString()
  @IsNotEmpty()
  securityId: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(OrderType)
  @IsNotEmpty()
  orderType: OrderType;

  @IsNumber()
  price: number;
}
