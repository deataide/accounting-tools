import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import { ClientRepository, CreateClientInput } from 'src/models/client';
import { InjectRepository, Repository } from 'src/repositories';

@Injectable()
export class ClientRepositoryService extends ClientRepository{
  constructor(
    @InjectRepository('client')
    private readonly clientRepository: Repository<'client'>,


  ) {
    super()
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



}
