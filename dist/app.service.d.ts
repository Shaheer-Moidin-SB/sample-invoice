import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
export declare class AppService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    getHello(): string;
    handleOrderCreated(orderCreatedEvent: OrderCreatedEvent): void;
}
