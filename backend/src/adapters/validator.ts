
export abstract class DataValidatorAdapter {
  abstract validateCpf(cpf: string): string | null;
  abstract validateCnpj(cnpj: string): string | null;
  abstract validateName(name: string): string | null;
}
