import { DatePipe,NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import type { OnInit} from '@angular/core';
import { Component, inject, ViewChild } from '@angular/core';
import { MatAnchor, MatButton,MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import type { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow,MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

import { formatDuration, getStatusBadgeClass, getStatusLabel } from '../../../../core/helpers/solution';
import type { SolutionDto } from '../../../../core/interfaces/solucao';
import { SolucoesService } from '../../../../core/services/solucoes/solucoes.service';
import type { SolverResponseDto, TimetableDto } from '../../components/solution-result-dialog/solution-result-dialog.component';

@Component({
    selector: 'app-solucao-page',
    templateUrl: './solucao-page.component.html',
    styleUrl: './solucao-page.component.scss',
    standalone: true,
    imports: [MatIconButton, MatTooltip, MatIcon, NgClass, MatAnchor, MatProgressSpinner, MatButton, MatTabGroup, MatTab, MatTabLabel, MatFormField, MatLabel, MatInput, MatSuffix, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator, DatePipe]
})
export class SolucaoPageComponent implements OnInit {
  isLoading = true;
  hasError = false;
  solutionData: SolutionDto | null = null;

  dataSourceTeachers = new MatTableDataSource<TimetableDto>([]);
  dataSourceClassrooms = new MatTableDataSource<TimetableDto>([]);

  getStatusLabel = getStatusLabel;

  getStatusBadgeClass = getStatusBadgeClass;

  formatDuration = formatDuration;

  displayedColumns = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  @ViewChild('paginatorTeachers') paginatorTeachers!: MatPaginator;
  @ViewChild('sortTeachers') sortTeachers!: MatSort;
  
  @ViewChild('paginatorClassrooms') paginatorClassrooms!: MatPaginator;
  @ViewChild('sortClassrooms') sortClassrooms!: MatSort;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private solucoesService = inject(SolucoesService);

  ngOnInit(): void {
    const solutionId = this.route.snapshot.paramMap.get('solucaoId');
    const instituicaoId = this.route.snapshot.paramMap.get('instituicaoId');

    if (solutionId) {
      this.loadSolutionData(Number(instituicaoId), Number(solutionId));
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
  }

  loadSolutionData(instituicaoId: number, solucaoId: number): void {
    this.solucoesService.get(instituicaoId, solucaoId).subscribe({
      next: (solution) => {
        this.solutionData = solution;
        if (solution.outputPath) {
          this.fetchJsonContent(solution.outputPath);
        } else {
          this.hasError = true;
          this.isLoading = false;
        }
      },
      error: (err: unknown) => {
        console.error('Erro ao buscar solução', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  fetchJsonContent(url: string): void {
    this.http.get<SolverResponseDto>(url).subscribe({
      next: (response) => {
        this.dataSourceTeachers.data = response.teachers;
        this.dataSourceClassrooms.data = response.classrooms;
        
        this.setupFilterPredicate(this.dataSourceTeachers);
        this.setupFilterPredicate(this.dataSourceClassrooms);

        setTimeout(() => {
          this.dataSourceTeachers.paginator = this.paginatorTeachers;
          this.dataSourceTeachers.sort = this.sortTeachers;
          
          this.dataSourceClassrooms.paginator = this.paginatorClassrooms;
          this.dataSourceClassrooms.sort = this.sortClassrooms;
        });

        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error('Erro ao baixar JSON', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<TimetableDto>): void {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
    if (dataSource.paginator) dataSource.paginator.firstPage();
  }

  setupFilterPredicate(dataSource: MatTableDataSource<TimetableDto>): void {
    dataSource.filterPredicate = (data: TimetableDto, filter: string) => {
      const fullString = [
        data.name,
        ...data.monday,
        ...data.tuesday,
        ...data.wednesday,
        ...data.thursday,
        ...data.friday
      ].join(' ').toLowerCase();
      
      return fullString.includes(filter);
    };
  }

  goBack(): void {
    if (this.solutionData?.institutionId) {
        void this.router.navigate(['/admin/instituicoes', this.solutionData.institutionId]);
    } else {
        window.history.back();
    }
  }
}