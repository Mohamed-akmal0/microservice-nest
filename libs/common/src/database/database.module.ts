import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017/demo_microservice')],
  // imports: [
  //   MongooseModule.forRootAsync({
  //     useFactory: (configService: ConfigService) => ({
  //       uri: configService.get<string>('MONGO_URL'),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
})
export class DatabaseModule {}
