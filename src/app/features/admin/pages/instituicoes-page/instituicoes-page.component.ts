import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions,MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import type { InstituicaoDto } from '../../../../core/interfaces/instituicao';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { CreateOrUpdateInstituicaoDialogComponent } from '../../components/create-or-update-instituicao-dialog/create-or-update-instituicao-dialog.component';


@Component({
    selector: 'app-instituicoes-page',
    templateUrl: './instituicoes-page.component.html',
    styleUrl: './instituicoes-page.component.scss',
    standalone: true,
    imports: [MatProgressSpinner, MatButton, MatIcon, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatIconButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class InstituicoesPageComponent implements OnInit {

  public dataSource = new MatTableDataSource<InstituicaoDto>();
  public displayedColumns: string[] = ['nome', 'codigo', 'acoes'];
  public instituicoes: InstituicaoDto[] = [];
  public isLoading = true;

  private instituicoesService = inject(InstituicoesService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.carregarInstituicoes();
  }

  private carregarInstituicoes(): void {
    this.isLoading = true;
    this.instituicoesService.getAll().subscribe({
      next: (dados) => {
        if (dados.length > 0) {
          this.instituicoes = dados;
          this.dataSource.data = dados;
        } else {
          this.instituicoes = [];
          this.dataSource.data = [];
          this.snackBar.open("Não encontramos nenhuma instituição", "Fechar", {
            duration: 3000
          });
        }
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
  }

  public acessarInstituicao(instituicaoId: number): void {
    void this.router.navigate(['/admin/instituicoes', instituicaoId]);
  }

  public openDialog(instituicaoData?: InstituicaoDto): void {
      this.dialog.open(CreateOrUpdateInstituicaoDialogComponent, {
        data: instituicaoData,
        height: "60%",
        width: "60%"
      }).afterClosed().subscribe((resp: InstituicaoDto | undefined) => {
        if (resp) {
          this.carregarInstituicoes();
        }
      });
  }
}