import { Component, OnInit } from '@angular/core';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InstituicaoFullDto } from '../../../../core/interfaces/instituicao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SolucaoDto } from '../../../../core/interfaces/solucao';

@Component({
  selector: 'app-instituicao-page',
  templateUrl: './instituicao-page.component.html',
  styleUrl: './instituicao-page.component.scss'
})
export class InstituicaoPageComponent implements OnInit {
  instituicao: InstituicaoFullDto | null = null;
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<SolucaoDto>();
  displayedColumns: string[] = [
    'criadoEm',
    'finalizadoEm',
    'status',
    'tempoExecucao',
    'input',
    'resultado'
  ];

  constructor(
    private instatuicoesService: InstituicoesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
      this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const instituicaoIdStr = params.get('instituicaoId');
      if (instituicaoIdStr) {
        const instituicaoId = parseInt(instituicaoIdStr);
        this.instatuicoesService.getByIdFull(instituicaoId).subscribe({
          next: (response) => {
            this.instituicao = response;
            this.dataSource.data = this.instituicao?.solucoes || [];
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
        })
      }
    });
  }

  runNewSolution(): void {
    if (this.instituicao) {
      this.router.navigate(['solucoes/nova'], { relativeTo: this.activateRoute });
    }
  }

  downloadInput(inputPath: string): void {
    if (inputPath) {
      window.open(inputPath, '_blank');
    } else {
        this.snackBar.open("Arquivo de entrada não encontrado.", "Fechar", { duration: 3000 });
    }
  }

  viewOutput(solucaoId: number): void {
    this.router.navigate(['solucoes', solucaoId], { relativeTo: this.activateRoute });
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) {
      return '-';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  }

}
