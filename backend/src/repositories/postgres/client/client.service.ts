import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import {
  ClientRepository,
  CreateClientInput,
  UpdateClientInput,
  UserIdAndClientId,
} from 'src/models/client';
import { InjectRepository, Repository } from 'src/repositories';

@Injectable()
export class ClientRepositoryService extends ClientRepository {
  constructor(
    @InjectRepository('client')
    private readonly clientRepository: Repository<'client'>,
  ) {
    super();
  }

  async getById(i: UserIdAndClientId): Promise<Client | null> {
    const client = await this.clientRepository.findUnique({
      where: {
        id: i.clientId,
        masterId: i.userId,
      },
    });

    return client;
  }

  async update(i: UpdateClientInput): Promise<Client | null> {
    const client = await this.clientRepository.findFirst({
      where: {
        id: i.id,
        masterId: i.userId,
      },
    });

    if (!client) {
      return null;
    }

    const updatedClient = await this.clientRepository.update({
      where: {
        id: client.id,
      },
      data: {
        name: i.name || client.name,
        cnpj: i.cnpj || client.cnpj,
        cpf: i.cpf || client.cpf,
        stateRegistration: i.stateRegistration || client.stateRegistration,
      },
    });

    return updatedClient;
  }

  async create(input: CreateClientInput): Promise<Client | null> {
    try {
      const createdClient = await this.clientRepository.create({
        data: {
          name: input.name,
          cnpj: input.cnpj || null,
          cpf: input.cpf || null,
          stateRegistration: input.stateRegistration || null,
          masterId: input.userId,
        },
      });

      return createdClient;
    } catch (error) {
      console.error('Internal Error', error);
      return null;
    }
  }

  async getAll(userId: string): Promise<Client[] | null> {
    try {
      const clients = await this.clientRepository.findMany({
        where: {
          masterId: userId,
        },
      });

      return clients;
    } catch (error) {
      console.error('Internal Error', error);
    }
  }

  async delete(i: UserIdAndClientId): Promise<void> {
    try {
      const deletedClient = await this.clientRepository.delete({
        where: {
          id: i.clientId,
          masterId: i.userId,
        },
      });

      return;
    } catch (error) {
      console.error('Internal Error', error);
      return;
    }
  }
}
