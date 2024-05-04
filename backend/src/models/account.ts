import { RoleEnum, User } from '@prisma/client';

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

export interface CreateAccountOutput {
  id: string;
  name: string;
}

export interface AdminUser {
  id: string;
}

export interface UsersToApproveOutput {
  id: string;
  name: string;
  role: RoleEnum
}

export interface GetAllOutput {
  id: string;
  name: string;
  cnpj: string;
  role: RoleEnum;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  cnpj?: string;
  cpf?: string;
}

export abstract class AccountRepository {
  abstract create(i: CreateAccount): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(i: User): Promise<User | null>;
  abstract getAll(id: string): Promise<User[] | null>;
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(i: GetByEmailInput): Promise<User | null>;
  abstract getGuests(): Promise<User[] | null>;
  abstract guestToUser(id: string): Promise<User | null>;
  abstract userToGuest(id: string): Promise<void>;
}

export abstract class AccountUseCase {
  abstract create(i: CreateAccount): Promise<CreateAccountOutput | null>;
  abstract update(i: UpdateUserInput): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract getAll(): Promise<GetAllOutput[] | null>;
  abstract getAllNotAproved(): Promise<UsersToApproveOutput[] | null>;
  abstract getById(id: string): Promise<User | null>;

  abstract approveUser(id: string): Promise<User | null>;
  abstract disapproveUser(id: string): Promise<User | null>;
}
