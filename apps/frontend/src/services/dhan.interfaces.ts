export interface SetDhanTokenDto {
  accessToken: string;
}

export interface PlaceOrderDto {
  dhanClientId: string;
  correlationId: string;
  transactionType: 'BUY' | 'SELL';
  exchangeSegment: 'NSE_EQ' | 'NSE_FNO' | 'NSE_CURRENCY' | 'BSE_EQ' | 'BSE_FNO' | 'BSE_CURRENCY' | 'MCX_COMM';
  productType: 'INTRADAY' | 'CNC' | 'MARGIN' | 'MTF' | 'COVER' | 'BRACKET';
  orderType: 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_MARKET';
  validity: 'DAY' | 'IOC';
  tradingSymbol: string;
  securityId: string;
  quantity: number;
  price?: number;
  triggerPrice?: number;
  afterMarketOrder?: boolean;
  amoTime?: 'OPEN' | 'OPEN_30' | 'OPEN_60';
  boProfitValue?: number;
  boStoplossValue?: number;
  drvExpiryDate?: string;
  drvOptionType?: 'CALL' | 'PUT';
  drvStrikePrice?: number;
}

export interface ModifyOrderDto {
  orderId: string;
  orderType: 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_MARKET';
  quantity: number;
  price?: number;
  triggerPrice?: number;
  validity: 'DAY' | 'IOC';
  tradingSymbol: string;
  dhanClientId: string;
}
