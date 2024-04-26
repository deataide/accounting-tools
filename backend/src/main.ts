import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    credentials: true,
    origin: true, // Você também pode definir a origem permitida aqui
  });
  app.use(cookieParser());
  
  
	await app.listen(process.env.PORT);
}
bootstrap();
