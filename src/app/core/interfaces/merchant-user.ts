import { Merchant } from "./merchant";

export enum ModulePermission {
  CATALOG = 'CATALOG',
  ORDER = 'ORDER',
  COMMAND = 'COMMAND',
  LOGISTIC = 'LOGISTIC',
  MERCHANT = 'MERCHANT',
  INTEGRATION = 'INTEGRATION'
}


export interface MerchantUser {
  id?: number | null;
  email: string
  name: string
  phone: string
  permissions: ModulePermission[]
  merchant: Merchant

}