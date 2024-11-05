import { Address } from "./address";

export interface Merchant {
    id?: number | null;
    name: string;
    documentType: 'CPF' | 'CNPJ';
    document: string;
    
    address: Address;
  }



