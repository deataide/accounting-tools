export interface GenAccessInput {
  accountId: string;
}

export interface GenAccessOutput {
  accessToken: string;
  expiresAt: string;
}

export interface TokenPayload {
  sub: string //accountId
  exp: number
}

export abstract class TokenAdapter {
  abstract genAccess(i: GenAccessInput): GenAccessOutput;
  abstract validateAccess(i: string): TokenPayload | null;
}
