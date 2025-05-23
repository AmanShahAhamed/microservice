import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;
  Logger.log(`app is running on ${port}`);
  await app.listen(3001, '0.0.0.0'); // ✅ Not just app.listen(3001)
}
bootstrap();
