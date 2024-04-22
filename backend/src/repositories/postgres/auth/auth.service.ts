import { InjectRepository, Repository } from '../..';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateAccount,
  GetByEmailInput,
} from 'src/models/account';
import { AuthRepository } from 'src/models/auth';

@Injectable()
export class AuthRepositoryService extends AuthRepository {
  constructor(
    @InjectRepository('user')
    private readonly accountRepository: Repository<'user'>,
  ) {
    super();
  }

  createAccount(i: CreateAccount): Promise<User> {

    return this.accountRepository.create({
      data: {
        name: i.name,
        email: i.email,
        password: i.password,
        cnpj: i.cnpj,
        cpf: i.cpf,
      },
    });
  }

  getByEmail({ email }: GetByEmailInput): Promise<User | null> {
    return this.accountRepository.findUnique({
      where: {
        email:email,
      },
    });
  }
}
