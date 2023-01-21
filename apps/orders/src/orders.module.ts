import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config/dist';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule, RmqModule } from '@app/common';
import { OrderRepo } from '../order.repository';
import { Order, OrderSchema } from '../schemas/order.schema';
import { BILLING_SERVICE } from './constants/services';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    //registering order schema & class
    RmqModule.register({
      // registering billing microservice in order service
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepo],
})
export class OrdersModule {}
