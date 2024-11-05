import { Merchant } from "./merchant"

export interface AuthToken {
    accessToken: string
  }
  export interface User {
    email: string
    name: string
    phone: string
    password: string 
    
}
export interface MerchantRegistration {
    merchant: Merchant
    user: User
}

export interface MerchantUserLogin {
    email: string
    password: string
}