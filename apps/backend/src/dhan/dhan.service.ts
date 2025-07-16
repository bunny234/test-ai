import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import axios, { AxiosError } from 'axios';
import {
  PlaceOrderRequest,
  ModifyOrderRequest,
  OrderResponse,
} from './interfaces/dhan.interfaces';

@Injectable()
export class DhanService {
  private readonly dhanApiUrl = 'https://api.dhan.co';

  constructor(private readonly userService: UserService) {}

  async setDhanAccessToken(user: User, accessToken: string): Promise<User> {
    // In a real application, you would encrypt the access token before saving it.
    user.dhan_access_token = accessToken;
    return this.userService.updateUser(user);
  }

  async placeOrder(
    user: User,
    orderDetails: PlaceOrderRequest,
  ): Promise<OrderResponse> {
    const headers = {
      'access-token': user.dhan_access_token,
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post(
        `${this.dhanApiUrl}/orders`,
        orderDetails,
        { headers },
      );
      return response.data;
    } catch (error) {
      this.handleDhanApiError(error);
    }
  }

  async modifyOrder(
    user: User,
    orderId: string,
    orderDetails: ModifyOrderRequest,
  ): Promise<OrderResponse> {
    const headers = {
      'access-token': user.dhan_access_token,
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.put(
        `${this.dhanApiUrl}/orders/${orderId}`,
        orderDetails,
        { headers },
      );
      return response.data;
    } catch (error) {
      this.handleDhanApiError(error);
    }
  }

  async cancelOrder(user: User, orderId: string): Promise<OrderResponse> {
    const headers = {
      'access-token': user.dhan_access_token,
    };
    try {
      const response = await axios.delete(
        `${this.dhanApiUrl}/orders/${orderId}`,
        { headers },
      );
      return response.data;
    } catch (error) {
      this.handleDhanApiError(error);
    }
  }

  private handleDhanApiError(error: AxiosError): never {
    if (error.response) {
      throw new HttpException(
        error.response.data as string | Record<string, any>,
        error.response.status,
      );
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
