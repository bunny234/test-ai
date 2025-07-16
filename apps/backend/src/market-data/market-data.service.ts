import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MarketDataService implements OnModuleInit {
  private ws: WebSocket;
  private readonly marketDataSubject = new Subject<any>();
  private instruments: string[] = [];

  // Hardcoded for now, should be fetched from user service
  private readonly accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzE2OTk2MTg5LCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJzb2NrZXQiOnRydWUsInoiOiJZVFF5YVBRcyJ9.rrT5i_g3Vdx-4n1F6p3h5zOq-i-I_G3N8pW-i_g3N8pW-i_g3N8pW-i_g3N8pW-i_g3N8pW-i_g3N8pW-i_g';
  private readonly clientId = '11000101';

  onModuleInit() {
    this.connect();
  }

  connect() {
    const url = 'wss://api-feed.dhan.co/market-data';
    this.ws = new WebSocket(url, {
      headers: {
        'access-token': this.accessToken,
      },
    });

    this.ws.on('open', () => {
      console.log('Connected to Dhan market data feed');
      this.subscribe(this.instruments);
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      const message = JSON.parse(data.toString());
      this.marketDataSubject.next(message);
    });

    this.ws.on('close', () => {
      console.log('Disconnected from Dhan market data feed');
    });

    this.ws.on('error', (error) => {
      console.error('Dhan market data feed error:', error);
    });
  }

  subscribe(instruments: string[]) {
    this.instruments = [...new Set([...this.instruments, ...instruments])];
    const subscription = {
      action: 'subscribe',
      instruments: this.instruments.map((instrument) => ({
        exchange: 'NSE_EQ',
        symbol: instrument,
      })),
    };
    this.ws.send(JSON.stringify(subscription));
  }

  unsubscribe(instruments: string[]) {
    this.instruments = this.instruments.filter(
      (instrument) => !instruments.includes(instrument),
    );
    const subscription = {
      action: 'unsubscribe',
      instruments: instruments.map((instrument) => ({
        exchange: 'NSE_EQ',
        symbol: instrument,
      })),
    };
    this.ws.send(JSON.stringify(subscription));
  }

  getMarketData(): Observable<any> {
    return this.marketDataSubject.asObservable();
  }
}
