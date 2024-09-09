import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
// import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    // @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('SEND_INVOICE') private readonly sendInvoiceClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    try {
      // const user = await this.authClient
      //   .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      //   .toPromise();

      console.log(
        `Billing user with stripe ID ${orderCreatedEvent.userId} a price of $${orderCreatedEvent.price}...`,
      );
      const communicationRes = await this.sendInvoiceClient.send(
        'send.invoice',
        { price: orderCreatedEvent.price },
      );
      return communicationRes;
    } catch (oError) {
      throw new RpcException('Error while creating order ' + oError);
    }
  }
}
