import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  InvalidCredentialsException,
  InvalidData,
  UserAlreadyExistsException,
  UserNotFoundException,
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

@Catch(UserNotFoundException)
export class UserNotFoundFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.NOT_FOUND).json({
      message: 'Usuário não encontrado',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

@Catch(InvalidData)
export class InvalidDataFilter implements ExceptionFilter {
  catch(exception: InvalidData, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const data = exception.data;
    response.status(HttpStatus.BAD_REQUEST).json({
      message: `Conteúdo inválido ${data}`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
