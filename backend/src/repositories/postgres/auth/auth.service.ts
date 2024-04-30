import { InjectRepository, Repository } from '../..';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateAccount,
  GetByEmailInput,
} from 'src/models/account';

@Injectable()
export class AuthRepositoryService {
  constructor(
    @InjectRepository('user')
    private readonly accountRepository: Repository<'user'>,
  ) {
  }

  createAccount(i: CreateAccount): Promise<User> {
return


}}
