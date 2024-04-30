import { AccountRepository } from 'src/models/account';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  ClientRepository,
  ClientUseCase,
  CreateClientInput,
  UpdateClientInput,
  UserIdAndClientId,
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

  async getById(i: UserIdAndClientId): Promise<Client | null> {
    const client = await this.clientRepository.getById(i);

    if (!client) {
      throw new HttpException('Client doesnt exists', HttpStatus.BAD_REQUEST);
    }

    return client;
  }
  update(i: UpdateClientInput): Promise<Client | null> {
    throw new Error('Method not implemented.');
  }
  async delete(i: UserIdAndClientId): Promise<void> {
    await this.clientRepository.delete(i);
    return null;
  }

  async create(i: CreateClientInput): Promise<Client | null> {
    const userIdExists = this.accountRepository.getById({ id: i.userId });

    if (!userIdExists) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST);
    }

    const newClient = await this.clientRepository.create({
      name: i.name,
      cnpj: i.cnpj,
      cpf: i.cpf,
      stateRegistration: i.stateRegistration,
      userId: i.userId,
    });

    return newClient;
  }
  async getAll(userId: string): Promise<Client[] | null> {
    const clients = await this.clientRepository.getAll(userId);

    return clients;
  }
}
