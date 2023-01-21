import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // we have to bind config module because rmq will use it.
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URL: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
  ], // we should bind the rmq module otherwise it will not work
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
