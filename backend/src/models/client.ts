import { Client, TaxRegimeEnum } from '@prisma/client';

export interface CreateClientInput {
  userId: string;
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: string | null;
}

export interface UpdateClientInput {
  userId: string;
  id: string;
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: TaxRegimeEnum | null;
}

export interface ClientOutput {
  id: string;
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: TaxRegimeEnum | null;
}

export interface UserIdAndClientId {
  userId: string;
  clientId: string;
}

export abstract class ClientRepository {
  abstract create(i: CreateClientInput): Promise<Client | null>;
  abstract getAll(userId: string): Promise<Client[] | null>;
  abstract getById(i: UserIdAndClientId): Promise<Client | null>;
  abstract update(i: UpdateClientInput): Promise<Client | null>;
  abstract delete(i: UserIdAndClientId): Promise<void>;
}

export abstract class ClientUseCase {
  abstract create(i: CreateClientInput): Promise<Client | null>;
  abstract getAll(userId: string): Promise<Client[] | null>;
  abstract getById(i: UserIdAndClientId): Promise<Client | null>;
  abstract update(i: UpdateClientInput): Promise<Client | null>;
  abstract delete(i: UserIdAndClientId): Promise<void>;
}
