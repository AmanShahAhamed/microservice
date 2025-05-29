import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InventoryModule } from './inventory.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   InventoryModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'inventory_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
  // await app.listen();

  const app = await NestFactory.create(InventoryModule);

  // Use global validation pipe

  // Register JwtTokenGuard globally with dependencies

  const port = process.env.PORT ?? 3001;
  Logger.log(`🚀 App is running on http://localhost:${port}`);
  await app.listen(port);


}
bootstrap();
