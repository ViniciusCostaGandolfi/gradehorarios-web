
export interface AuthToken {
    accessToken: string
  }
export interface UserCreation {
    email: string
    name: string
    phone: string
    password: string 

}

export interface UserLogin {
    email: string
    password: string
}