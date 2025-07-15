import { IsNumber, IsOptional } from 'class-validator';

export class ModifyOrderDto {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}
