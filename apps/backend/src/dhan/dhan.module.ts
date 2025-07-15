import { Module } from '@nestjs/common';
import { DhanService } from './dhan.service';
import { DhanController } from './dhan.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [DhanService],
  controllers: [DhanController],
})
export class DhanModule {}
