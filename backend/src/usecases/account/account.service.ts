import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BcryptAdapterService } from 'src/adapters/implementations/bcrypt/bcrypt.service';

import {
  AccountUseCase,
  CreateAccount,
  CreateAccountOutput,
  FindAllOutput,
  UpdateUserInput,
  UsersToAproveOutput,
} from 'src/models/account';
import { AccountRepositoryService } from 'src/repositories/postgres/account/account.service';

@Injectable()
export class AccountService extends AccountUseCase {
  constructor(
    @Inject(AccountRepositoryService)
    private readonly accountRepository: AccountRepositoryService,
    @Inject(BcryptAdapterService)
    private readonly bcrypt: BcryptAdapterService,
  ) {
    super();
  }

  async create(i: CreateAccount): Promise<CreateAccountOutput> {
    const hashedPassword = await this.bcrypt.encrypt({ password: i.password });

    const userAlreadyExists = await this.accountRepository.getByEmail({
      email: i.email,
    });

    if (userAlreadyExists) {
      throw new HttpException(
        'O e-mail já está sendo utilizado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = {
      name: i.name,
      email: i.email,
      password: hashedPassword,
      cnpj: i.cnpj || null,
      cpf: i.cpf || null,
      admin: false,
    };

    const newUser = await this.accountRepository.create(userData);

    return {
      id: newUser.id,
      name: newUser.id,
    };
  }

  async update(i: UpdateUserInput): Promise<User | null> {
    if (!i) {
      throw new HttpException('Parâmetros inválidos', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = this.accountRepository.update(i);
    return updatedUser;
  }

  async delete({id}): Promise<Boolean> {
    this.accountRepository.delete(id);

    const findUser = this.accountRepository.getById(id);

    if (!findUser) {
      return true;
    } else {
      return false;
    }
  }

  async findAllToAprove(): Promise<UsersToAproveOutput[]> {
    const usersToAprove = await this.accountRepository.getToApprove();
    return usersToAprove;
  }

  async findAll(): Promise<FindAllOutput[]> {
    const users = await this.accountRepository.getAll();
    return users;
  }
}
