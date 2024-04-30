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

    res.cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      secure: true,
    });

    return { role: role, hasAuthenticatedUser: hasAuthenticatedUser };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { role: null, hasAuthenticatedUser: false };
  }
}
