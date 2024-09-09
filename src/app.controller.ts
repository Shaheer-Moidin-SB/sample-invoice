import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientKafka,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    // @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('SEND_INVOICE') private readonly sendInvoiceClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('order_created')
  async handleOrderCreated(data: any) {
    try {
      return await this.appService.handleOrderCreated(data);
    } catch (oError) {
      throw new RpcException('Error while creating order ');
    }
  }

  onModuleInit() {
    // this.authClient.subscribeToResponseOf('get_user');
    this.sendInvoiceClient.subscribeToResponseOf('send.invoice');
  }
}
