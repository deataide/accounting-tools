import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('O e-mail já está sendo utilizado', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
  }
}
