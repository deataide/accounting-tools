import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { BcryptAdapterService } from 'src/adapters/implementations/bcrypt/bcrypt.service';
import { JwtAdapterService } from 'src/adapters/implementations/jwt/jwt.service';
import { AuthUseCase, LoginInput, LoginOutput } from 'src/models/auth';
import { AccountRepositoryService } from 'src/repositories/postgres/account/account.service';

@Injectable()
export class AuthService extends AuthUseCase {
  constructor(
    @Inject(AccountRepositoryService)
    private readonly accountRepository: AccountRepositoryService,
    @Inject(BcryptAdapterService)
    private readonly bcrypt: BcryptAdapterService,
    @Inject(JwtAdapterService)
    private readonly jwtInstance: JwtAdapterService,
  ) {
    super();
  }

  async login(i: LoginInput): Promise<LoginOutput> {
    const user = await this.accountRepository.getByEmail({ email: i.email });

    if (!i.email || !i.password || !user)
      throw new HttpException(
        'E-mail ou senha incorretos',
        HttpStatus.BAD_REQUEST,
      );

    const correctPassword = await this.bcrypt.compareCrypt({
      attemptPassword: i.password,
      hashedPassword: user.password,
    });

    if (!correctPassword)
      throw new HttpException(
        'E-mail ou senha incorretos',
        HttpStatus.BAD_REQUEST,
      );

    const { accessToken, expiresAt } = this.jwtInstance.genAccess({
      accountId: user.id,
    });

    const payload = {
      token: accessToken,
      expiresAt: expiresAt,
      role: user.role,
      hasAuthenticatedUser: true,
    };

    return {
      payload: payload,
    };
  }
}
