import { IsEmail, IsString } from "class-validator"



export class SignUpDto {
    @IsString()
     name:string

    @IsEmail()
    email        :string  
    @IsString()
    password     :string
    @IsString()
    cnpj         :string
    @IsString()
    cpf          :string
}

//Criar validador para ver se o cpnj é válido.