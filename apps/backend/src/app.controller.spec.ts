import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('profile', () => {
    it('should return "Hello from a protected route!"', () => {
      expect(appController.getProfile()).toBe('Hello from a protected route!');
    });
  });
});
