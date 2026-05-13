import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './auth/roles.decorator';
import { UserRole } from './user/user.entity';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin')
  getAdminHello(): string {
    return 'Hello Admin!';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(): string {
    return 'Hello from a protected route!';
  }
}
