import { Client, TaxRegimeEnum, User } from '@prisma/client';

export interface CreateClientInput {
userId: string
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: string | null;
}

export interface CreateClientOutput{
    id: string;
    name: string
    cnpj: string
}

export interface UpdateClientInput{
    userId: string
    id: string
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: TaxRegimeEnum | null
}

export interface UserAndClientId {
  userid: string
  clientId: string
}



export abstract class ClientRepository {
    abstract createClient(i: CreateClientInput):Promise<Client | null>
    abstract getAll({userId}):Promise<Client[] | null>
      abstract getById(i: UserAndClientId):Promise<Client  | null>
    abstract update(i: UpdateClientInput):Promise<Client | null>
    abstract delete(i: UserAndClientId)
}

export abstract class ClientUseCase{
    abstract create(i:CreateClientInput):Promise<CreateClientOutput | null>
    abstract getAll(i: UserAndClientId):Promise<Client[] | null>
      abstract getById({clientId}):Promise<Client | null>
    abstract update(i: UpdateClientInput):Promise<Client | null>
    abstract delete(i: UserAndClientId)
}
