export interface EnderecoBaseDto {
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  codigoPostal: string;
  logradouro: string;
  numero: string;
  enderecoFormatado: string;
  complemento?: string;
  latitude?: number;
  longitude?: number;
}

export interface InscricaoEstadualBaseDto {
  codigo: number;
  nome: string;
  email: string;
  telefone?: string;
  localizacao: string;
  dependencia_administrativa: string;
}

export interface InscricaoEstadualCreateDto extends InscricaoEstadualBaseDto {}

export interface InscricaoEstadualDto extends InscricaoEstadualCreateDto {
  id: number;
  usuario_id: number;
}