import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { GetUserRequest } from './get-user-request.dto';
import { CreatePriceEvent } from './create-price-event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('SEND_INVOICE') private readonly sendInvoiceClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    try {
      await this.authClient
        .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
        .subscribe(async (user) => {
          console.log(
            `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
          );
        });
      await this.sendInvoiceClient.emit(
        'send.invoice',
        new CreatePriceEvent(orderCreatedEvent.price),
      );
      return 'hello';
    } catch (oError) {
      throw new RpcException('Error while creating order ' + oError);
    }
  }
}
