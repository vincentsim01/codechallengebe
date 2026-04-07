import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips extra fields
      forbidNonWhitelisted: true, // throw error if extra fields present
      transform: true, // auto-transform payload to DTO class
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
