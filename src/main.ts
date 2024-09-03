import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'billing-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3004, () =>
    console.log('Invoice service HTTP server is listening on port 3004'),
  );
}
bootstrap();
