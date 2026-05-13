import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MarketDataService } from './market-data.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MarketDataGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly marketDataService: MarketDataService) {}

  onModuleInit() {
    this.marketDataService.getMarketData().subscribe((data) => {
      this.server.emit('market-data', data);
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() payload: SubscribeDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.marketDataService.subscribe(payload.symbols);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(
    @MessageBody() payload: SubscribeDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.marketDataService.unsubscribe(payload.symbols);
  }
}
