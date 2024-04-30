import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
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
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
