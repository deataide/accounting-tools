import { InjectRepository, Repository } from '../..';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  AccountRepository,
  CreateAccount,
  GetByEmailInput,
  GetByIdInput,
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

  getNotAproved(): Promise<User[]> {
    return this.accountRepository.findMany({
      where: {
        approved: false,
      },
    });
  }

  async approve(id: string): Promise<User | null> {
    const approvedUser = await this.accountRepository.update({
      where: {
        id: id,
      },
      data: {
        approved: true,
      },
    });

    if (!approvedUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return approvedUser;
  }

  async disapprove(id: string): Promise<void> {
    await this.accountRepository.update({
      where: {
        id: id,
      },
      data: {
        approved: false,
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

  getById({ id }: GetByIdInput): Promise<User | null> {
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

    return
  }

  getAll(): Promise<User[]> {
    return this.accountRepository.findMany({
      where: {
        approved: true,
      },
    });
  }

  getToApprove(): Promise<User[]> {
    return this.accountRepository.findMany({
      where: {
        approved: false,
      },
    });
  }
}
