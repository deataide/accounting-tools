import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RoleEnum, User } from '@prisma/client';
import { BcryptAdapterService } from 'src/adapters/implementations/bcrypt/bcrypt.service';
import { DataValidatorAdapterService } from 'src/adapters/implementations/validator/validator.service';
import {
  InvalidData,
  UserAlreadyExistsException,
} from 'src/exceptions/user.exceptions';

import {
  AccountUseCase,
  CreateAccount,
  CreateAccountOutput,
  GetAllOutput,
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
    @Inject(DataValidatorAdapterService)
    private readonly validate: DataValidatorAdapterService,
  ) {
    super();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.accountRepository.getById(id);

    return user;
  }

  async getAllNotAproved(): Promise<UsersToApproveOutput[]> {
    const users = await this.accountRepository.getGuests();
    return users;
  }
  async approveUser(id: string): Promise<User | null> {
    const user = await this.accountRepository.guestToUser(id);
    return user;
  }
  async disapproveUser(id: string): Promise<User | null> {
    await this.accountRepository.userToGuest(id);
    return;
  }

  async create(i: CreateAccount): Promise<CreateAccountOutput> {
    const hashedPassword = await this.bcrypt.encrypt({ password: i.password });

    const userAlreadyExists = await this.accountRepository.getByEmail({
      email: i.email,
    });

    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }

    const validatedCnpj = this.validate.validateCnpj(i.cnpj);
    const validatedCpf = this.validate.validateCpf(i.cpf);
    const validatedName = this.validate.validateName(i.name);

    if (!validatedCnpj || !validatedCpf || !validatedName) {
      throw new InvalidData('Nome/CNPJ/CPF inválido');
    }

    const userData = {
      name: validatedName,
      email: i.email,
      password: hashedPassword,
      cnpj: validatedCnpj,
      cpf: validatedCpf,
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
    if (!updatedUser) {
      throw new InvalidData('O usuário não foi atualizado.');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.accountRepository.delete(id);

    const findUser = this.accountRepository.getById(id);

    if (!findUser) {
      return;
    } else {
      return;
    }
  }

  async getAll(): Promise<GetAllOutput[]> {
    const users = await this.accountRepository.getAll();
    return users;
  }
}
