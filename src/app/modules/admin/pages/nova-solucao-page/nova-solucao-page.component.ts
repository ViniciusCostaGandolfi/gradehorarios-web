import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx'; // Importa a biblioteca para ler Excel

import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { InstituicaoDto } from '../../../../core/interfaces/instituicao';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SolucoesService } from '../../../../core/services/solucoes/solucoes.service';

// Interface para estruturar os dados das abas do Excel
interface SheetData {
  name: string;
  rows: any[];
  columns: { name: string, prop: string }[];
}

@Component({
  selector: 'app-nova-solucao-page',
  templateUrl: './nova-solucao-page.component.html',
  styleUrls: ['./nova-solucao-page.component.scss']
})
export class NovaSolucaoPageComponent implements OnInit {

  instituicao: InstituicaoDto | null = null;
  isLoading: boolean = true;
  isProcessingFile: boolean = false;
  isDragging: boolean = false;

  uploadedFile: File | null = null;
  excelSheets: SheetData[] = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(
    private instituicoesService: InstituicoesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private solucoesService: SolucoesService
  ) { }

  ngOnInit(): void {
    const instituicaoIdStr = this.activateRoute.snapshot.paramMap.get('instituicaoId');
    if (instituicaoIdStr) {
      const instituicaoId = parseInt(instituicaoIdStr, 10);
      this.fetchInstituicaoData(instituicaoId);
    } else {
      this.snackBar.open("ID da instituição não fornecido.", "Fechar", { duration: 5000 });
      this.isLoading = false;
    }
  }

  fetchInstituicaoData(id: number): void {
    this.isLoading = true;
    this.instituicoesService.getById(id).subscribe({
      next: (response) => {
        this.instituicao = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar instituição', err);
        this.snackBar.open("Ocorreu um erro ao buscar os dados da instituição.", "Fechar", {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }

  downloadTemplate(): void {
    const link = document.createElement('a');
    link.href = '/assets/templates/modelo_base.xlsx';
    link.download = 'modelo_base.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }

  handleFile(file: File): void {
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.snackBar.open("Formato de arquivo inválido. Por favor, envie um arquivo .xlsx.", "Fechar", { duration: 5000 });
      return;
    }
    this.uploadedFile = file;
  }



  validate(): void {
    if (!this.uploadedFile || !this.instituicao) {
      this.snackBar.open("Por favor, selecione um arquivo e certifique-se que a instituição foi carregada.", "Fechar", { duration: 5000 });
      return;
    }

    this.isProcessingFile = true;
    const instituicaoId = this.instituicao.id;

    this.solucoesService.create(instituicaoId, this.uploadedFile).subscribe({
      next: (response) => {
        this.isProcessingFile = false;
        this.snackBar.open("Arquivo validado e solução criada com sucesso! ✅", "Fechar", {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/solucoes', response.id]);
      },
      error: (err) => {
        this.isProcessingFile = false;
        
        const errorMessage = err.error?.detail || "Ocorreu um erro desconhecido ao validar o arquivo.";
        
        this.snackBar.open(errorMessage, "Fechar", {
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
