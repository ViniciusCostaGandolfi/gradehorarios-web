export enum SolverStatus {
  OPTIMAL = 'OPTIMAL',
  FEASIBLE = 'FEASIBLE',
  INFEASIBLE = 'INFEASIBLE',
  ERROR = 'ERROR',
  RUNNING = 'RUNNING',
  TIMEOUT = 'TIMEOUT',
  PENDING = 'PENDING',
  UNKNOWN = 'UNKNOWN',
}

export interface SolutionDto {

  id: number;
  createdAt: string;
  inputPath: string;
  outputPath: string | null;
  solverStatus: SolverStatus;
  durationMillis: number | null;
  errorMessage: string | null;
  classroomOutputPath: string | null;
  teacherOutputPath: string | null;
  warningMessage: string | null;
  modelName: string | null;
  institutionId: number;
}

export interface InstitutionResponseDto {
  id: number;
  name: string;
  code: string;
  active: boolean;
  solutions: SolutionDto[];
}