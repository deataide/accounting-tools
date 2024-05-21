import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  InvalidCredentialsFilter,
  UserAlreadyExistsFilter,
} from './exceptions/filters/user.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new UserAlreadyExistsFilter(),
    new InvalidCredentialsFilter(),
  );

  app.enableCors({
    credentials: true,
    origin: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
