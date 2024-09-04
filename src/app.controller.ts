import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('SEND_INVOICE') private readonly sendInvoiceClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    try {
      return this.appService.handleOrderCreated(data);
    } catch (oError) {
      throw new RpcException('Error while creating order ');
    }
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.sendInvoiceClient.subscribeToResponseOf('send.invoice');
  }
}
