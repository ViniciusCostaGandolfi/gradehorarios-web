
export type TipoUsuario = 'CONSULTOR' | 'NORMAL';

export interface UsuarioBaseDto {
    nome: string;
    email: string;
    telefone: string;
    documento: string;
    tipo: TipoUsuario;
}

export interface UsuarioDto extends UsuarioBaseDto {
    id: number;
}