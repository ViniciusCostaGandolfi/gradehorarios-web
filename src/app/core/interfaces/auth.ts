import { UserBaseDto, UserDto } from "./usuario"

export interface AuthToken {
    token: string
}
export interface UserCreation extends UserBaseDto {
    password: string
}

export interface UserLogin {
    email: string
    password: string
}

export interface TokenUserDto {
    user: UserDto
    exp: number
}