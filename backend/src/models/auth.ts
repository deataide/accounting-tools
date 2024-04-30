import { User } from "@prisma/client";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  payload: {
    role: string;
    token: string;
    expiresAt: string;
    hasAuthenticatedUser: boolean;
  };
}

export interface GetByEmailInput {
  email: string;
}

export abstract class AuthUseCase {
  abstract login(i: LoginInput): Promise<LoginOutput>;
}
export abstract class AuthRepository {
  abstract createAccount(i: LoginInput): Promise<User | null>;
}
