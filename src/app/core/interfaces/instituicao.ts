import type { SolutionDto } from "./solucao";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InstituicaoCreationDto extends InstituicaoBaseDto {}

export interface InstituicaoBaseDto {
  code: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InstituicaoCreateDto extends InstituicaoBaseDto {}

 
export interface InstituicaoUpdateDto extends InstituicaoBaseDto {
  user: number;
}

export interface InstituicaoDto extends InstituicaoBaseDto {
  id: number;
  user: number;
}

export interface InstituicaoFullDto extends InstituicaoDto {
  solutions: SolutionDto[];
  active: boolean;
}