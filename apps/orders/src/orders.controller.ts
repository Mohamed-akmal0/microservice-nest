import { Body, Controller, Post, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order-dto';
@Controller('/order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() req: CreateOrderRequest) {
    return this.ordersService.createOrder(req);
  }
  @Get('')
  async getOrders() {
    return this.ordersService.getOrder();
  }
}
