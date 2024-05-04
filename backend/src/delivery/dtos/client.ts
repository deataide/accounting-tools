import { TaxRegimeEnum } from "@prisma/client"

export class CreateClientDto {
    name: string
    cnpj: string | null
    cpf: string | null
    stateRegistration: TaxRegimeEnum | null
    userId: string
}
export class UpdateClientDto {
    id: string
    name: string
    cnpj: string | null
    cpf: string | null
    stateRegistration: null
    userId: string
}
