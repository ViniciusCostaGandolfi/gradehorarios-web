import { Component } from '@angular/core';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { Router } from '@angular/router';
import { InstituicaoDto } from '../../../../core/interfaces/instituicao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateInstituicaoDialogComponent } from '../../components/create-or-update-instituicao-dialog/create-or-update-instituicao-dialog.component';

@Component({
  selector: 'app-instituicoes-page',
  templateUrl: './instituicoes-page.component.html',
  styleUrl: './instituicoes-page.component.scss'
})
export class InstituicoesPageComponent {

  public dataSource = new MatTableDataSource<InstituicaoDto>();
  public displayedColumns: string[] = ['nome', 'codigo', 'acoes'];
  public instituicoes: InstituicaoDto[] = [];
  public isLoading: boolean = true;

  constructor(
    private instituicoesService: InstituicoesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarInstituicoes();
  }

  private carregarInstituicoes(): void {
    this.isLoading = true;
    this.instituicoesService.getAll().subscribe({
      next: (dados) => {
        if (dados && dados.length > 0) {
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
      error: (err) => {
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
    this.router.navigate(['/admin/instituicoes', instituicaoId]);
  }

  public openDialog(instituicaoData?: InstituicaoDto): void {
      this.dialog.open(CreateOrUpdateInstituicaoDialogComponent, {
        data: instituicaoData,
        height: "60%",
        width: "60%"
      }).afterClosed().subscribe(resp => {
        if (resp) {
          this.carregarInstituicoes()
        }
      })
  }
}