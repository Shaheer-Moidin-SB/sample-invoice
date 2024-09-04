import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';
export declare class AppService {
    private readonly authClient;
    private readonly sendInvoiceClient;
    constructor(authClient: ClientKafka, sendInvoiceClient: ClientKafka);
    getHello(): string;
    handleOrderCreated(orderCreatedEvent: OrderCreatedEvent): Promise<string>;
}
