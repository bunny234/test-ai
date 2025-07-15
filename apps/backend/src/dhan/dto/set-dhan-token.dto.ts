import { IsString, IsNotEmpty } from 'class-validator';

export class SetDhanTokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
