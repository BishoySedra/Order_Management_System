import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get base url from .env file
  const baseUrl = process.env.BASE_URL || '/api';
  app.setGlobalPrefix(baseUrl);

  // get port from .env file
  const port = process.env.PORT || 3000;
  console.log(`Server is running on ${port}`);

  // use pipes for validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(port);
}
bootstrap();
