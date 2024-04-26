export class CreateClientDto {
    name: string
    cnpj: string | null
    cpf: string | null
    stateRegistration: string | null
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
