import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { $Enums, User } from '@prisma/client';
import { BcryptAdapterService } from 'src/adapters/implementations/bcrypt/bcrypt.service';

import {
  AccountUseCase,
  CreateAccount,
  CreateAccountOutput,
  FindAllOutput,
  UpdateUserInput,
  UsersToApproveOutput,
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

  async findAllNotAproved(): Promise<UsersToApproveOutput[]> {
    const users = await this.accountRepository.getToApprove()

    return users
  }
  async approveUser(id: string): Promise<User | null> {
   const user = await this.accountRepository.approve(id)
   return user
  }
  async disapproveUser(id: string): Promise<User | null> {
    const user = await this.accountRepository.disapprove(id)
    return
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
      name: newUser.name,
    };
  }

  async update(i: UpdateUserInput): Promise<User | null> {
    if (!i) {
      throw new HttpException('Parâmetros inválidos', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = this.accountRepository.update(i);
    return updatedUser;
  }

  async delete(id:string): Promise<void> {
    this.accountRepository.delete(id);

    const findUser = this.accountRepository.getById({id});

    if (!findUser) {
      return;
    } else {
      return;
    }
  }

  async findAllToAprove(): Promise<UsersToApproveOutput[]> {
    const usersToAprove = await this.accountRepository.getToApprove();
    return usersToAprove;
  }

  async findAll(): Promise<FindAllOutput[]> {
    const users = await this.accountRepository.getAll();
    return users;
  }
}
