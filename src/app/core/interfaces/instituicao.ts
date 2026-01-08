import { SolutionDto } from "./solucao";

export interface InstituicaoBaseDto {
  code: string;
  name: string;
}

export interface InstituicaoCreateDto extends InstituicaoBaseDto {}

export interface InstituicaoUpdateDto extends InstituicaoBaseDto {
  id: number;
}

export interface InstituicaoDto extends InstituicaoBaseDto {
  id: number;
  user: number;
}

export interface InstituicaoFullDto extends InstituicaoDto {
  solutions: SolutionDto[];
  active: boolean;
}