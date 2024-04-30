import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
} from '../user.exceptions';

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: UserAlreadyExistsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.BAD_REQUEST).json({
      message: 'O e-mail já está sendo utilizado',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

@Catch(InvalidCredentialsException)
export class InvalidCredentialsFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Credenciais inválidas',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
