import { UserId } from './../../delivery/decorators/token.decorator';
import { AccountRepository } from 'src/models/account';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  ClientRepository,
  ClientUseCase,
  CreateClientInput,
  CreateClientOutput,
  UpdateClientInput,
} from 'src/models/client';
import { AccountRepositoryService } from 'src/repositories/postgres/account/account.service';
import { ClientRepositoryService } from 'src/repositories/postgres/client/client.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService extends ClientUseCase {
  constructor(
    @Inject(ClientRepositoryService)
    private readonly clientRepository: ClientRepository,
    @Inject(AccountRepositoryService)
    private readonly accountRepository: AccountRepository,
  ) {
    super();
  }

  async create(i: CreateClientInput): Promise<CreateClientOutput> {
    const userIdExists = this.accountRepository.getById({ id: i.userId });

    if (!userIdExists) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST);
    }

    const newClient = await this.clientRepository.createClient({
      name: i.name,
      cnpj: i.cnpj,
      cpf: i.cpf,
      stateRegistration: i.stateRegistration,
      userId: i.userId,
    });

    return {
      id: newClient.id,
      name: newClient.name,
      cnpj: newClient.cnpj || null,
    };
  }
  async getAll({ userId }): Promise<Client[] | null> {
    const clients = await this.clientRepository.getAll({ userId });

    return clients;
  }



}
