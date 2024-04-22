export class CreateClientDto {
    name: string
    cnpj: string | null
    cpf: string | null
    stateRegistration: string | null
    userId: string
}