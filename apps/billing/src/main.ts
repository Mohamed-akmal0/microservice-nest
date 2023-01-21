import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  //inside bracket specify the name of service
  //inside this <> specify the type of service
  app.connectMicroservice(rmqService.getOptions('BILLING', false)); //name of queue for this micro service
  await app.startAllMicroservices();
  // this is all we need to do to start up a rmq microservices.
}
bootstrap();
