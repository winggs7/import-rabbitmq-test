import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // const port: number = configService.get<number>('app.http.port');

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     port: port,
  //   },
  // });

  const rmqUser: string = configService.get<string>(
    'microservice.rabbitmq.user',
  );
  const rmqPass: string = configService.get<string>(
    'microservice.rabbitmq.password',
  );
  const rmqHost: string = configService.get<string>(
    'microservice.rabbitmq.host',
  );
  const rmqQueue: string = configService.get<string>(
    'microservice.rabbitmq.queue',
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPass}@${rmqHost}`],
      queue: rmqQueue,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );

  await app.startAllMicroservices();
}
bootstrap();
