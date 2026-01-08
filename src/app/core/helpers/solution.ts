import { SolverStatus } from "../interfaces/solucao";


export function getStatusBadgeClass(status: SolverStatus): string {
    switch (status) {
      case 'OPTIMAL': return 'bg-green-100 text-green-800 border-green-200';
      case 'FEASIBLE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'INFEASIBLE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      case 'RUNNING': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

export function getStatusLabel(status: SolverStatus): string {
    switch (status) {
      case 'OPTIMAL': return 'Ótima';
      case 'FEASIBLE': return 'Viável';
      case 'INFEASIBLE': return 'Inviável';
      case 'ERROR': return 'Erro';
      case 'RUNNING': return 'Processando';
      default: return status;
    }
  }


  export function formatDuration(millis: number | null): string {
    if (millis === null || millis === undefined) return '-';
    const seconds = millis / 1000;
    return seconds.toFixed(2) + 's';
  }