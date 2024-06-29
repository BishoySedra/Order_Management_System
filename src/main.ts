import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the port from the environment variable
  const port = process.env.PORT || 3000;

  // set base URL for the API
  app.setGlobalPrefix(process.env.BASE_URL);

  // enable validation globally whitelist true if you want to allow only the properties you've defined in your DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port, () => log(`Server is running on port ${port}`));
}
bootstrap();
