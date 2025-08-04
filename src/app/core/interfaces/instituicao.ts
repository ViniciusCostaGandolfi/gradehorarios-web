import { SolucaoDto } from "./solucao";

export interface InstituicaoBaseDto {
  codigo: number;
  nome: string;
}

export interface InstituicaoCreateDto extends InstituicaoBaseDto {}

export interface InstituicaoUpdateDto extends InstituicaoBaseDto {
  id: number;
}

export interface InstituicaoDto extends InstituicaoBaseDto {
  id: number;
  usuarioId: number;
}

export interface InstituicaoFullDto extends InstituicaoDto {
  solucoes: SolucaoDto[]
}