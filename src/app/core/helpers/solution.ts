import { SolverStatus } from "../interfaces/solucao";


export function getStatusBadgeClass(status: SolverStatus): string {
    switch (status) {
      case SolverStatus.OPTIMAL: return 'bg-green-100 text-green-800 border-green-200';
      case SolverStatus.FEASIBLE: return 'bg-blue-100 text-blue-800 border-blue-200';
      case SolverStatus.INFEASIBLE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case SolverStatus.ERROR: return 'bg-red-100 text-red-800 border-red-200';
      case SolverStatus.RUNNING: return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

export function getStatusLabel(status: SolverStatus): string {
    switch (status) {
      case SolverStatus.OPTIMAL: return 'Ótima';
      case SolverStatus.FEASIBLE: return 'Viável';
      case SolverStatus.INFEASIBLE: return 'Inviável';
      case SolverStatus.ERROR: return 'Erro';
      case SolverStatus.RUNNING: return 'Processando';
      default: return status;
    }
  }


  export function formatDuration(millis: number | null): string {
    if (millis == null) return '-';
    const seconds = millis / 1000;
    return seconds.toFixed(2) + 's';
  }