
export type SolverStatus =
  | "SOLVED"
  | "OPTIMAL"
  | "FEASIBLE"
  | "INFEASIBLE";

export type SolverType = "SCIP";

export type TipoArea = "URBANA" | "RURAL";

export type TipoDependenciaAdministrativa =
  | "MUNICIPAL"
  | "ESTADUAL"
  | "FEDERAL"
  | "PRIVADA";

export type TipoUsuario = "USUARIO" | "ADMIN";


export interface SolverStats {
  
}


export interface SolucaoBaseDto {
  criadoEm: string;
  finalizadoEm?: string;
  inputPath: string;
  outputPath?: string;
  solverStats?: SolverStats;
  solver_status: SolverStatus;
  timeToSolve: number;
  solver_type: SolverType;
  solver_runing: boolean;
  errors: any
}

export interface SolucaoCreateDto extends SolucaoBaseDto {}

export interface SolucaoDto extends SolucaoBaseDto {
  id: number;
}