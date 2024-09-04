import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private readonly authClient;
    private readonly sendInvoiceClient;
    constructor(appService: AppService, authClient: ClientKafka, sendInvoiceClient: ClientKafka);
    getHello(): string;
    handleOrderCreated(data: any): Promise<string>;
    onModuleInit(): void;
}
