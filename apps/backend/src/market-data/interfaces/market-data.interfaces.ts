export interface MarketData {
  symbol: string;
  ltp: number;
  timestamp: number;
}

export interface Instrument {
  exchange: string;
  symbol: string;
}

export interface Subscription {
  action: 'subscribe' | 'unsubscribe';
  instruments: Instrument[];
}
