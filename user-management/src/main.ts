import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtTokenGuard } from './JwtAuthGuard'; // Adjust path as needed
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Register JwtTokenGuard globally with dependencies
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtTokenGuard(jwtService, reflector));

  const port = process.env.PORT ?? 3004;
  Logger.log(`🚀 App is running on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
