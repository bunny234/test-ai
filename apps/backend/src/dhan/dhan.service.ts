import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import axios from 'axios';

@Injectable()
export class DhanService {
  private readonly dhanApiUrl = 'https://api.dhan.co';

  constructor(private readonly userService: UserService) {}

  async setDhanAccessToken(user: User, accessToken: string): Promise<User> {
    // In a real application, you would encrypt the access token before saving it.
    user.dhan_access_token = accessToken;
    return this.userService.updateUser(user);
  }

  async placeOrder(user: User, orderDetails: any): Promise<any> {
    const headers = {
      'access-token': user.dhan_access_token,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${this.dhanApiUrl}/orders`, orderDetails, { headers });
    return response.data;
  }

  async modifyOrder(user: User, orderId: string, orderDetails: any): Promise<any> {
    const headers = {
      'access-token': user.dhan_access_token,
      'Content-Type': 'application/json',
    };
    const response = await axios.put(`${this.dhanApiUrl}/orders/${orderId}`, orderDetails, { headers });
    return response.data;
  }

  async cancelOrder(user: User, orderId: string): Promise<any> {
    const headers = {
      'access-token': user.dhan_access_token,
    };
    const response = await axios.delete(`${this.dhanApiUrl}/orders/${orderId}`, { headers });
    return response.data;
  }
}
