export interface PlaceOrderRequest {
  securityId: string;
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  orderType: 'MARKET' | 'LIMIT';
  price?: number;
}

export interface ModifyOrderRequest {
  quantity?: number;
  price?: number;
}

export interface OrderResponse {
  orderId: string;
  status: string;
}
