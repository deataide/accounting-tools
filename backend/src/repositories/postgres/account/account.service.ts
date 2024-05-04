import { InjectRepository, Repository } from '../..';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEnum, User } from '@prisma/client';
import {
  AccountRepository,
  CreateAccount,
  GetByEmailInput,
  UpdateUserInput,
} from 'src/models/account';

@Injectable()
export class AccountRepositoryService extends AccountRepository {
  constructor(
    @InjectRepository('user')
    private readonly accountRepository: Repository<'user'>,
  ) {
    super();
  }

  getGuests(): Promise<User[] | null> {
    return this.accountRepository.findMany({
      where: {
        role: RoleEnum.GUEST,
      },
    });
  }

  async guestToUser(id: string): Promise<User | null> {
    const approvedUser = await this.accountRepository.update({
      where: {
        id: id,
      },
      data: {
        role: RoleEnum.USER,
      },
    });

    if (!approvedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return approvedUser;
  }

  async userToGuest(id: string): Promise<void> {
    await this.accountRepository.update({
      where: {
        id: id,
      },
      data: {
        role: RoleEnum.GUEST,
      },
    });
  }

  async update(i: UpdateUserInput): Promise<User | null> {
    const user = await this.accountRepository.findFirst({
      where: {
        id: i.id,
      },
    });

    if (!user) {
      return null;
    }

    const updatedUser = await this.accountRepository.update({
      where: {
        id: user.id,
      },
      data: {
        name: i.name || user.name,
        email: i.email || user.email,
        cpf: i.cpf || user.cpf,
        cnpj: i.cnpj || user.cnpj,
      },
    });
    return updatedUser;
  }

  create(i: CreateAccount): Promise<User> {
    return this.accountRepository.create({
      data: {
        name: i.name,
        email: i.email,
        password: i.password,
        cnpj: i.cnpj,
        cpf: i.cpf,
        role: RoleEnum.GUEST,
      },
    });
  }

  getByEmail({ email }: GetByEmailInput): Promise<User | null> {
    return this.accountRepository.findUnique({
      where: {
        email: email,
      },
    });
  }

  getById(id: string): Promise<User | null> {
    return this.accountRepository.findUnique({
      where: {
        id: id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const deletedUser = await this.accountRepository.delete({
      where: {
        id: id,
      },
    });

    if (!deletedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return;
  }

  async getAll(): Promise<User[]> {
    const users = await this.accountRepository.findMany({
      where: {
        role: RoleEnum.USER,
      },
    });

    return users;
  }
}
