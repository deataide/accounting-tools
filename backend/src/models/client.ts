import { Client } from '@prisma/client';

export interface CreateClientInput {
userId: string
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: string | null;
}

export interface CreateClientOutput{
    id: number;
    name: string
    cnpj: string
}


export abstract class ClientRepository {
    abstract createClient(i: CreateClientInput):Promise<Client | null>
}

export abstract class ClientUseCase{
    abstract create(i:CreateClientInput):Promise<CreateClientOutput | null>
}
