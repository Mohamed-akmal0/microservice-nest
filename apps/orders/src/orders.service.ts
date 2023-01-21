import { Injectable, Inject } from '@nestjs/common';
import { OrderRepo } from '../order.repository';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order-dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepo, // Repo injection
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy, //injecting billing service to communicate with that service
  ) {}

  async create(req: CreateOrderRequest) {
    console.log(req);

    return this.orderRepository.create(req);
  }

  async getOrder() {
    return this.orderRepository.find({});
  }

  async createOrder(req: CreateOrderRequest) {
    const session = await this.orderRepository.startTransaction(); // database transaction
    try {
      const order = await this.orderRepository.create(req, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          req,
        }),
      );
      await session.commitTransaction(); // this will commit database transaction.
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
