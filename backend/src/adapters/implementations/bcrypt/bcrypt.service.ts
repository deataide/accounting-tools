import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from 'src/config';
import { ConfigService } from '@nestjs/config';
import {
  DecryptInput,
  EncryptAdapter,
  EncryptInput,
} from 'src/adapters/encrypt';

import {hash, compare} from 'bcrypt'

@Injectable()
export class BcryptAdapterService extends EncryptAdapter {
  constructor(
   // @Inject('bcrypt')
    //protected readonly bcrypt: bcrypt,
    @Inject(ConfigService)
    protected readonly config: AppConfig,
  ) {
    super();
  }

  async encrypt({ password }: EncryptInput): Promise<string> {

    const encryptedPassword = await hash(password, 10);
    return  encryptedPassword;
  }

  async compareCrypt({
    attemptPassword,
    hashedPassword,
  }: DecryptInput): Promise<true | null> {
    const comparedPassword = await compare(
      attemptPassword,
      hashedPassword,
    );

    if (!comparedPassword) {
      return null;
    }

    if (comparedPassword) {
      return true;
    }
  }
}
