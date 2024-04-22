export interface InvoiceObjectInput {
    numero: string;
    ufEmitente: string;
    ufRemetente: string;
    cnpjEmitente: string;
    nomeEmitente: string;
  
    itens: [
      {
        numero: string;
        prod: string;
        cfop: string;
        ncm: number;
        aliquota: number;
        value: number;
      }
    ];
    aliquota: number;
  }
  
  export interface InvoiceObjectOutpt {
    header: {
      numero: string;
      cnpjEmitente: string;
      nomeEmitente: string;
    };
    tax_calcs: Object;
    total_tax: number;
    tax_substitution: number;
    total_tributation_12_0: number;
    total_tributation_4: number;
  }
  
  export function calcTax(
    invoices: Array<InvoiceObjectInput>
  ): [InvoiceObjectOutpt] {
    let results: any = [];
    try {
      invoices.forEach((invoice) => {
        if (invoice.ufEmitente === invoice.ufRemetente) {
          throw new Error("A NOTA FISCAL DEVERÁ SER DE OUTRO ESTADO");
        }
        if (!invoice.itens) {
          throw new Error("A NOTA FISCAL NÃO CONTÉM PRODUTOS");
        }
  
        let total_tax: number = 0; // Valor do Imposto Calculado
        let tax_substitution: number = 0; // Valor total da substituição
        const tax_calcs: any = {}; // Valor total das notas e o imposto individual
        let total_tributation_4: number = 0; // Valor total do imposto calculado sobre 17.07%
        let total_tributation_12_0: number = 0; // Valor total do imposto calculado sobre 7.32%
  
        invoice.itens.forEach((item) => {
          const keyNcmCfop = `NCM:${item.ncm}, CFOP:${item.cfop}`;
  
          if (!tax_calcs[keyNcmCfop]) {
            tax_calcs[keyNcmCfop] = {
              total: 0,
              calculed_tax: 0,
            };
          }
  
          let aliquota: number = 0;
  
          if (item.aliquota == 4) {
            aliquota = 17.07;
          } else if (item.aliquota == 12 || item.aliquota == 0) {
            aliquota = 7.32;
          } else {
            throw new Error("Aliquota Not Defined");
          }
  
          if (aliquota == 17.07 && item.cfop.startsWith("61")) {
            total_tributation_4 += item.value;
          }
          if (aliquota == 7.32 && item.cfop.startsWith("61")) {
            total_tributation_12_0 += item.value;
          }
  
          // Calcula o imposto individual para o item
          const item_tax = (item.value * aliquota) / 100;
  
          tax_calcs[keyNcmCfop].total += item.value;
          tax_calcs[keyNcmCfop].calculed_tax += item_tax;
  
          // Adicione o valor do imposto individual ao total_tax
          if (item.cfop.startsWith("61")) {
            total_tax += item_tax;
          } else {
            tax_substitution += item.value;
          }
        });
  
        const ObjectReturn = {
          header: {
            numero: invoice.numero,
            cnpjEmitente: invoice.cnpjEmitente,
            nomeEmitente: invoice.nomeEmitente,
          },
          tax_calcs,
          total_tax,
          tax_substitution,
          total_tributation_12_0,
          total_tributation_4,
        };
  
        results.push(ObjectReturn);
      });
  
      return results;
    } catch (error: any) {
      console.error("Internal Error", error.message);
      throw new Error(error);
    }
  }
  