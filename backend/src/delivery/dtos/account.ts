import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;
}

export interface UpdateAccountDto {
  name?: string;
  email?: string;
  cnpj?: string;
  cpf?: string;
}
