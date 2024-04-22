import { User } from '@prisma/client';

export interface CreateAccount {
  name: string;
  email: string;
  password: string;
  cnpj?: string;
  cpf?: string;
}

export interface GetByEmailInput {
  email: string;
}

export interface CreateAccountOutput{
  id: string
  name: string

}

export interface GetByIdInput{
  id: string
}

export interface AdminUser{
  id: string
}

export interface UsersToAproveOutput{
  id: string
  name: string
  cnpj: string
  approved: boolean
}

export interface FindAllOutput {
  id: string
  name: string
  cnpj: string
  approved: boolean
}

export abstract class AccountRepository {
  abstract createAccount(i: CreateAccount): Promise<User | null>;

  abstract getByEmail(i: GetByEmailInput): Promise<User | null>;

  abstract getById(i: GetByIdInput): Promise<User | null>;

  abstract getToApprove(): Promise<User[] | null>

  abstract getAll(): Promise<User[] | null>

}

export abstract class AccountUseCase {
  abstract create(i: CreateAccount): Promise<CreateAccountOutput| null>;
  abstract findAllToAprove(i: AdminUser):Promise<UsersToAproveOutput[] | null>
  abstract findAll(i:AdminUser):Promise<FindAllOutput[] | null>
}
