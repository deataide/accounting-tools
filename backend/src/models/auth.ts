import { User } from "@prisma/client"


export interface LoginInput{
email: string
password: string
}

export interface LoginOutput{
    payload: Object
}

export interface GetByEmailInput{}

export abstract class AuthRepository {
abstract getByEmail(i:GetByEmailInput): Promise<User | null>
}


export abstract class AuthUseCase {

    abstract login(i:LoginInput): Promise<LoginOutput>

}


