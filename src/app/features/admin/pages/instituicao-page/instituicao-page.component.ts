import { DatePipe,NgClass } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatAnchor,MatButton } from '@angular/material/button';
import { MatCard, MatCardActions,MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import type { ParamMap } from '@angular/router';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import type { InstitutionResponseDto, SolutionDto } from '../../../../core/interfaces/solucao';
import { SolverStatus } from '../../../../core/interfaces/solucao';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { SolucoesService } from '../../../../core/services/solucoes/solucoes.service';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { SolutionResultDialogComponent } from '../../components/solution-result-dialog/solution-result-dialog.component';

@Component({
    selector: 'app-instituicao-page',
    templateUrl: './instituicao-page.component.html',
    styleUrl: './instituicao-page.component.scss',
    standalone: true,
    imports: [MatProgressSpinner, MatButton, MatIcon, MatCard, NgClass, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatAnchor, MatTooltip, RouterLink, DatePipe]
})
export class InstituicaoPageComponent implements OnInit {
  instituicao: InstitutionResponseDto | null = null;
  isLoading = true;
  
  dataSource = new MatTableDataSource<SolutionDto>();
  
  displayedColumns: string[] = [
    'createdAt',
    'solverStatus',
    'duration',
    'inputPath',
    'outputPath'
  ];

  private instatuicoesService = inject(InstituicoesService);
  private activateRoute = inject(ActivatedRoute);
  private solucoesService = inject(SolucoesService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

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
              solutions: response.solutions
            };
            this.dataSource.data = this.instituicao.solutions;
            this.isLoading = false;
          },
          error: (err: unknown) => {
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
      void this.router.navigate(['solucoes/nova'], { relativeTo: this.activateRoute });
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
        title: `Grade Horária - Solução #${solution.id.toString()}`
      }
    });
  }

  isSolutionProcessing(status: SolverStatus): boolean {
        return status === SolverStatus.PENDING || status === SolverStatus.RUNNING;
    }

    isSolutionCompleteSuccess(status: SolverStatus): boolean {
        return status === SolverStatus.OPTIMAL || status === SolverStatus.FEASIBLE;
    }

    isSolutionRunning(status: SolverStatus): boolean {
        return status === SolverStatus.RUNNING;
    }
    
    isSolutionCompleted(status: SolverStatus): boolean {
        return [SolverStatus.OPTIMAL, SolverStatus.FEASIBLE, SolverStatus.ERROR, SolverStatus.INFEASIBLE, SolverStatus.TIMEOUT].includes(status);
    }


    formatDuration(duration: number): string {
        const totalSeconds = duration / 1000;
        return totalSeconds.toFixed(2) + 's';
    }

  
  formatTime(value: number | null): string {
    if (value == null || isNaN(value) || value < 0) {
      return '-';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes.toString()}m ${seconds.toString()}s`;
  }

  getStatusColorClass(status: SolverStatus): string {
    switch (status) {
      case SolverStatus.OPTIMAL: return 'text-green-600';
      case SolverStatus.FEASIBLE: return 'text-blue-600';
      case SolverStatus.INFEASIBLE: return 'text-red-600';
      case SolverStatus.ERROR: return 'text-red-800';
      case SolverStatus.RUNNING: return 'text-orange-500';
      default: return 'text-gray-600';
    }
  }

  getStatusBadgeClass(status: SolverStatus): string {
    switch (status) {
      case SolverStatus.OPTIMAL: return 'bg-green-100 text-green-800';
      case SolverStatus.FEASIBLE: return 'bg-blue-100 text-blue-800';
      case SolverStatus.INFEASIBLE: return 'bg-red-100 text-red-800';
      case SolverStatus.ERROR: return 'bg-red-200 text-red-900';
      case SolverStatus.RUNNING: return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }


  deleteSolution(solutionId: number): void {
        if (!this.instituicao) return;
        const instituicaoId = this.instituicao.id;

        const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
            data: { 
                message: 'Tem certeza que deseja deletar permanentemente esta solução? Esta ação não pode ser desfeita.'
            }
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                console.log(`Deletando solução ID: ${solutionId.toString()}`);

                this.solucoesService.delete(instituicaoId, solutionId).subscribe({
                    next: () => {
                        this.snackBar.open("Solução deletada com sucesso! ✅", "Fechar", {
                        duration: 5000,
                        panelClass: ['snackbar-success']
                      });

                      this.ngOnInit();
                    },
                    error: (err: { error?: { detail?: string } }) => {
                        const errorMessage = err.error?.detail ?? "Ocorreu um erro desconhecido ao deletar.";
                        
                        this.snackBar.open(errorMessage, "Fechar", {
                          panelClass: ['snackbar-error']
                        });
                    }
                });
            }
        });
    }
}