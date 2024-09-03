import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    try {
      this.authClient
        .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
        .subscribe((user) => {
          console.log(
            `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
          );
          return 'user';
        });
        
    } catch (oError) {
      throw new RpcException('Error while creating order ' + oError);
    }
  }
}
