import { Test, TestingModule } from '@nestjs/testing';
import { DhanService } from './dhan.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import axios from 'axios';
import {
  PlaceOrderRequest,
  ModifyOrderRequest,
} from './interfaces/dhan.interfaces';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DhanService', () => {
  let service: DhanService;
  let userService: UserService;

  const mockUser = new User();
  mockUser.id = 1;
  mockUser.dhan_access_token = 'test_token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DhanService,
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<DhanService>(DhanService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setDhanAccessToken', () => {
    it('should set the dhan access token for a user', async () => {
      const accessToken = 'new_access_token';
      const result = await service.setDhanAccessToken(mockUser, accessToken);
      expect(userService.updateUser).toHaveBeenCalledWith({
        ...mockUser,
        dhan_access_token: accessToken,
      });
      expect(result.dhan_access_token).toBe(accessToken);
    });
  });

  describe('placeOrder', () => {
    it('should place an order', async () => {
      const orderDetails: PlaceOrderRequest = {
        securityId: '123',
        transactionType: 'BUY',
        quantity: 1,
        orderType: 'MARKET',
      };
      const response = { data: { orderId: '12345', status: 'PENDING' } };
      mockedAxios.post.mockResolvedValue(response);

      const result = await service.placeOrder(mockUser, orderDetails);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.dhan.co/orders',
        orderDetails,
        {
          headers: {
            'access-token': mockUser.dhan_access_token,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toEqual(response.data);
    });

    it('should handle API errors', async () => {
      const orderDetails: PlaceOrderRequest = {
        securityId: '123',
        transactionType: 'BUY',
        quantity: 1,
        orderType: 'MARKET',
      };
      const error = { response: { data: 'error', status: 400 } };
      mockedAxios.post.mockRejectedValue(error);

      await expect(service.placeOrder(mockUser, orderDetails)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('modifyOrder', () => {
    it('should modify an order', async () => {
      const orderId = '12345';
      const orderDetails: ModifyOrderRequest = {
        quantity: 2,
      };
      const response = { data: { orderId: '12345', status: 'MODIFIED' } };
      mockedAxios.put.mockResolvedValue(response);

      const result = await service.modifyOrder(mockUser, orderId, orderDetails);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `https://api.dhan.co/orders/${orderId}`,
        orderDetails,
        {
          headers: {
            'access-token': mockUser.dhan_access_token,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toEqual(response.data);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order', async () => {
      const orderId = '12345';
      const response = { data: { orderId: '12345', status: 'CANCELLED' } };
      mockedAxios.delete.mockResolvedValue(response);

      const result = await service.cancelOrder(mockUser, orderId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `https://api.dhan.co/orders/${orderId}`,
        {
          headers: {
            'access-token': mockUser.dhan_access_token,
          },
        },
      );
      expect(result).toEqual(response.data);
    });
  });
});
