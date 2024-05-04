import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from 'src/config';
import { ConfigService } from '@nestjs/config';
import { DataValidatorAdapter } from 'src/adapters/validator';


@Injectable()
export class DataValidatorAdapterService extends DataValidatorAdapter {
  constructor(
    @Inject(ConfigService)
    protected readonly config: AppConfig,
  ) {
    super();
  }

  validateCpf(cpf: string): string | null {
    if (cpf === null) {
      return cpf;
    }
  
    cpf = cpf.replace(/[^\d]+/g, ''); // Atribua o resultado de replace de volta a cpf
  
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return null;
    }
  
    return cpf;
  }
  
  validateCnpj(cnpj: string): string | null {
    if (cnpj === null) {
      return cnpj;
    }
  
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Atribua o resultado de replace de volta a cnpj
  
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return null;
    }
  
    return cnpj;
  }
  

  validateName(name: string): string | null {
    if (/[0-9]/.test(name) || name.length > 44) {
      return null;
    } else {
      return name;
    }
  }
}
