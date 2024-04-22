import { InjectRepository, Repository } from '../..';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  AccountRepository,
  CreateAccount,
  GetByEmailInput,
  GetByIdInput,
} from 'src/models/account';

@Injectable()
export class AccountRepositoryService extends AccountRepository {
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
  getById({id}: GetByIdInput): Promise<User | null> {
    return this.accountRepository.findUnique({
      where: {
        id:id,
      },
    });
  }

 getAll(): Promise<User[]> {
    return this.accountRepository.findMany({
      where: {
        approved: true
      }
    }) 

 }

 getToApprove(): Promise<User[]> {
   return this.accountRepository.findMany({where:{
    approved: false
   }})
 }
}
