import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport, RmqContext } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {} //To access .env variables.
  getOptions(queue: string, noAck: false): RmqOptions {
    // common functionality to initialize a rmq microservices
    // this is for to get call when the microservice are initializing it
    // RmqOption is from nest that saying this fn will return the rabbit mq options
    // noAck => is for after removing a api from the queue rmq will provide a msg. nest will automatically,
    // deal it. inOrder to prevent we have to give like this noAck : false
    return {
      transport: Transport.RMQ,
      options: {
        // this is url where rmq will listen. or this is our brokers.
        urls: [this.configService.get<string>('RABBIT_MQ_URL')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`), // name of the queue
        noAck,
        persistent: true, //to maintain the list of messages.
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
    // This is the wa we manually do acknowledgment
    // this is used to prevent the repeatation of rabbitMq msg logging from the queue
    // this will take of the msg from the queue after receiving it to corresponding service
  }
}
