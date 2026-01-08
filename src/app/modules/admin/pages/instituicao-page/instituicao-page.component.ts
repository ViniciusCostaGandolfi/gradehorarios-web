import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { InstitutionResponseDto, SolutionDto, SolverStatus } from '../../../../core/interfaces/solucao';
import { SolutionResultDialogComponent } from '../../components/solution-result-dialog/solution-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { SolucoesService } from '../../../../core/services/solucoes/solucoes.service';

@Component({
  selector: 'app-instituicao-page',
  templateUrl: './instituicao-page.component.html',
  styleUrl: './instituicao-page.component.scss'
})
export class InstituicaoPageComponent implements OnInit {
  instituicao: InstitutionResponseDto | null = null;
  isLoading: boolean = true;
  
  dataSource = new MatTableDataSource<SolutionDto>();
  
  displayedColumns: string[] = [
    'createdAt',
    'solverStatus',
    'duration',
    'inputPath',
    'outputPath'
  ];

  constructor(
    private instatuicoesService: InstituicoesService,
    private activateRoute: ActivatedRoute,
    private solucoesService: SolucoesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const instituicaoIdStr = params.get('instituicaoId');
      
      if (instituicaoIdStr) {
        const instituicaoId = parseInt(instituicaoIdStr);
        this.isLoading = true;

        this.instatuicoesService.getByIdFull(instituicaoId).subscribe({
          next: (response) => {
            this.instituicao = {
              id: response.id,
              name: response.name,
              code: response.code,
              active: response.active,
              solutions: response.solutions ?? []
            };
            this.dataSource.data = this.instituicao?.solutions || [];
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao buscar instituições', err);
            this.snackBar.open("Ocorreu um erro ao buscar as instituições.", "Fechar", {
              duration: 5000,
              panelClass: ['snackbar-error']
            });
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  runNewSolution(): void {
    if (this.instituicao) {
      this.router.navigate(['solucoes/nova'], { relativeTo: this.activateRoute });
    }
  }

  downloadInput(url: string | null): void {
    if (url) {
      window.open(url, '_blank');
    } else {
        this.snackBar.open("Arquivo de entrada não disponível.", "Fechar", { duration: 3000 });
    }
  }

  viewOutput(solution: SolutionDto): void {
    if (!solution.outputPath) {
        this.snackBar.open("O resultado ainda não está disponível.", "Fechar", { duration: 3000 });
        return;
    }

    this.dialog.open(SolutionResultDialogComponent, {
      width: '95vw',
      maxWidth: '1200px',
      height: '90vh', 
      panelClass: 'custom-dialog-container', 
      autoFocus: false,   
      data: {
        url: solution.outputPath,
        title: `Grade Horária - Solução #${solution.id}`
      }
    });
  }

  isSolutionProcessing(status: SolverStatus): boolean {
        return status === 'PENDING' || status === 'RUNNING';
    }

    isSolutionCompleteSuccess(status: SolverStatus): boolean {
        return status === 'OPTIMAL' || status === 'FEASIBLE';
    }

    isSolutionRunning(status: SolverStatus): boolean {
        return status === 'RUNNING';
    }
    
    isSolutionCompleted(status: SolverStatus): boolean {
        return ['OPTIMAL', 'FEASIBLE', 'ERROR', 'INFEASIBLE', 'TIMEOUT'].includes(status);
    }


    formatDuration(duration: any): string {

        if (typeof duration === 'number') {
            const totalSeconds = duration / 1000;
            return totalSeconds.toFixed(2) + 's';
        }
        if (duration && typeof duration.toMillis === 'function') {
             const totalSeconds = duration.toMillis() / 1000;
             return totalSeconds.toFixed(2) + 's';
        }
        return 'N/A';
    }

  
  formatTime(value: number | null): string {
    if (value === null || value === undefined || isNaN(value) || value < 0) {
      return '-';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}m ${seconds}s`;
  }

  getStatusColorClass(status: SolverStatus): string {
    switch (status) {
      case 'OPTIMAL': return 'text-green-600';
      case 'FEASIBLE': return 'text-blue-600';
      case 'INFEASIBLE': return 'text-red-600';
      case 'ERROR': return 'text-red-800';
      case 'RUNNING': return 'text-orange-500';
      default: return 'text-gray-600';
    }
  }

  getStatusBadgeClass(status: SolverStatus): string {
    switch (status) {
      case 'OPTIMAL': return 'bg-green-100 text-green-800';
      case 'FEASIBLE': return 'bg-blue-100 text-blue-800';
      case 'INFEASIBLE': return 'bg-red-100 text-red-800';
      case 'ERROR': return 'bg-red-200 text-red-900';
      case 'RUNNING': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }


  deleteSolution(solutionId: number): void {
        
        const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
            data: { 
                message: 'Tem certeza que deseja deletar permanentemente esta solução? Esta ação não pode ser desfeita.'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(`Deletando solução ID: ${solutionId}`);

                this.solucoesService.delete(this.instituicao?.id as number, solutionId).subscribe({
                    next: () => {
                        this.snackBar.open("Solução deletada com sucesso! ✅", "Fechar", {
                        duration: 5000,
                        panelClass: ['snackbar-success']
                      });

                      this.ngOnInit();
                    },
                    error: (err) => {
                        const errorMessage = err.error?.detail || "Ocorreu um erro desconhecido ao deletar.";
                        
                        this.snackBar.open(errorMessage, "Fechar", {
                          panelClass: ['snackbar-error']
                        });
                    }
                });
            }
        });
    }
}