import { RmqService } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService , private readonly rmqService : RmqService) {}

  // @Get()
  // getHello(): string {
  //   return this.billingService.getHello();
  // }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data); // only when this method succeed without throw err
    this.rmqService.ack(context) // then this will acknowledge and delete the msg from queue
  }
}
