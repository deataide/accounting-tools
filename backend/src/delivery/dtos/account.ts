import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email        :string  

    @IsNotEmpty()
    @IsString()
    password     :string

    @IsString()
    @IsNotEmpty()
    cnpj         :string

    @IsNotEmpty()
    @IsString()
    cpf          :string
}

//Criar validador para ver se o cpnj é válido.