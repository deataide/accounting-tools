
import {sign, verify} from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';

import {
  GenAccessInput,
  GenAccessOutput,
  TokenAdapter,
  TokenPayload,

  ValidateAccessInput,
} from '../../token';
import { AppConfig } from 'src/config';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class JwtAdapterService extends TokenAdapter {
  constructor(

    @Inject(ConfigService)
    protected readonly config: AppConfig,
  ) {
    super();
  }

  genAccess({ accountId }: GenAccessInput): GenAccessOutput {
    const payload: TokenPayload = {
      sub: accountId,
      exp: 20,
    };

    const accessToken = sign(
      payload,
      this.config.get('JWT_SECRET'),
    );

    return {
      accessToken,
      accountId: accountId,
      expiresAt: '',
    };
  }

  validateAccess({ accessToken }: ValidateAccessInput): true | false {

    const verified = verify(accessToken, this.config.get('JWT_SECRET'));
    if(verified){
      return true
    }else{
      return false
    }
  }
}
