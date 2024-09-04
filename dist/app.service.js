"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const get_user_request_dto_1 = require("./get-user-request.dto");
const create_price_event_1 = require("./create-price-event");
let AppService = class AppService {
    constructor(authClient, sendInvoiceClient) {
        this.authClient = authClient;
        this.sendInvoiceClient = sendInvoiceClient;
    }
    getHello() {
        return 'Hello World!';
    }
    async handleOrderCreated(orderCreatedEvent) {
        try {
            await this.authClient
                .send('get_user', new get_user_request_dto_1.GetUserRequest(orderCreatedEvent.userId))
                .subscribe(async (user) => {
                console.log(`Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`);
            });
            await this.sendInvoiceClient.emit('send.invoice', new create_price_event_1.CreatePriceEvent(orderCreatedEvent.price));
            return 'hello';
        }
        catch (oError) {
            throw new microservices_1.RpcException('Error while creating order ' + oError);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(1, (0, common_1.Inject)('SEND_INVOICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AppService);
//# sourceMappingURL=app.service.js.map