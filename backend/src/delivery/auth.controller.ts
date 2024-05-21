import { LoginOutput } from 'src/models/auth';
import { SignInDto } from './dtos/auth';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/usecases/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body() userData: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Object> {
    const payload = (await this.authService.login(userData)) as LoginOutput;

    const { expiresAt, hasAuthenticatedUser, role, token } = payload.payload;

    return payload

  }

}
