import { UsuarioBaseDto, UsuarioDto } from "./usuario"

export interface AuthToken {
    accessToken: string
}
export interface UserCreation extends UsuarioBaseDto {
    senha: string
    

}

export interface UserLogin {
    email: string
    senha: string
}

export interface TokenUsuarioDto {
    usuario: UsuarioDto
    exp: number
}