User
import React, { useState, useRef } from "react";
import xmlParser from "xml-js";
import { useForm } from "react-hook-form";
import { calcTax } from "./calcTax";

const XmlHandler = () => {

  const [invoices, setInvoices] = useState([{}]);
  const [tratedInvoices, setTratedInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [clientData, setClientData] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const doc = useRef(null);

  const onSubmit = (data) => {
    setIsFormVisible(false);
    setClientData(data);
  };

  const handleImport = async (event) => {
    const files = event.target.files;
    let newInvoices = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "text/xml") {
          const text = await file.text();
          const xmlData = xmlParser.xml2js(text, { compact: true });

          const notaData = {
            numero: findJsonProperties(xmlData.NFe, "nNF"),
            nomeEmitente: findJsonProperties(xmlData.nfeProc.NFe.infNFe.emit.enderEmit, "xNome"),
            cnpjEmitente: findJsonProperties(xmlData.nfeProc.NFe.infNFe.emit, "CNPJ"),
            ufEmitente: findJsonProperties(xmlData.nfeProc.NFe.infNFe.emit.enderEmit, "UF"),
            itens: [],
            totalValue: 0
          };
          const itens = findJsonProperties(xmlData.nfeProc.NFe.infNFe, "det");

          if (Array.isArray(itens)) {
            itens.forEach((item) => {
              const aliq = findJsonProperties(item, "ICMS00") || findJsonProperties(item, "ICMS10");
              const prod = findJsonProperties(item, "vProd");

              const newItem = {
                numero: findJsonProperties(item, "nItem"),
                xProd: findJsonProperties(item, "prod"),
                ncm: findJsonProperties(item, "NCM"),
                cfop: findJsonProperties(item, "CFOP"),
                aliq: parseFloat(aliq.pICMS._text.replace(",", ".")),
                value: parseFloat(prod.vProd._text.replace(",", "."))
              };
              notaData.itens.push(newItem);
              notaData.totalValue += newItem.value;
            });
          }

          newInvoices.push(notaData);
        }
      }
      setInvoices([...invoices, ...newInvoices]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao importar XML");
    }
  };

  const filterHandle = () => {
    try {
      const calc = calcTax(invoices);
      setTratedInvoices(calc);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao calcular impostos");
    }
  };

  const clearInvoices = () => {
    setTratedInvoices([]);
    setInvoices([]);
  };


  return (
<div>
    XmlHandler
</div>

  );
};

export default XmlHandler;