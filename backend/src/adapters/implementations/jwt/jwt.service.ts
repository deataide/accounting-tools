
import {TokenExpiredError, sign, verify} from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';

import {
  GenAccessInput,
  GenAccessOutput,
  TokenAdapter,
  TokenPayload,
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
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // Expira em 24 horas
    };

    const accessToken = sign(
      payload,
      this.config.get('JWT_SECRET'),
    );

    return {
      accessToken,
      expiresAt: new Date(payload.exp * 1000).toISOString(), // Converte o timestamp de expiração de volta para uma string ISO
    };
  }

  validateAccess(accessToken: string): TokenPayload | null {
    try {
      const decoded = verify(accessToken, this.config.get('JWT_SECRET')) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.error('O token JWT expirou:', error);
      } else {
   
        console.error('Erro ao decodificar o token JWT:', error);
      }
      return null; 
    }
  }
}
