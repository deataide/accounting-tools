import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import {
  ClientRepository,
  CreateClientInput,
  UpdateClientInput,
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

  async getById({clientId}): Promise<Client | null> {


    const client = await this.clientRepository.findFirst({
      where: {
        id: clientId
      },
    });

  
    return client;
  }
  
  async delete(clientId :string): Promise<Boolean> {
    const userDeleted = await this.clientRepository.delete({
      where: {
        id: clientId,
      },
    });

    if (userDeleted) {
      return;
    }
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

  async createClient(input: CreateClientInput): Promise<Client | null> {
    try {
      const createdClient = await this.clientRepository.create({
        data: {
          name: input.name,
          cnpj: input.cnpj,
          cpf: input.cpf,
          stateRegistration: input.stateRegistration,
          masterId: input.userId, // Define o ID do usuário associado ao cliente
        },
      });

      return createdClient;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return null;
    }
  }

  async getAll({ userId }): Promise<Client[] | null> {
    try {
      const clients = await this.clientRepository.findMany({
        where: {
          masterId: userId,
        },
      });

      return clients;
    } catch (error) {
      console.error('Erro ao get clientes:', error);
    }
  }
}
