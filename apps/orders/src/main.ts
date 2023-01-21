import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  // this is for registering validation pipe in each apps or services
  const configService = app.get(ConfigService); //This is the way to use .env variables
  await app.listen(configService.get('PORT'));
}
bootstrap();
