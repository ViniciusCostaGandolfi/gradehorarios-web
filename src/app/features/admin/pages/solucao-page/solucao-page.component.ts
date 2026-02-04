import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolutionDto } from '../../../../core/interfaces/solucao';
import { SolucoesService } from '../../../../core/services/solucoes/solucoes.service';
import { SolverResponseDto, TimetableDto } from '../../components/solution-result-dialog/solution-result-dialog.component';
import { formatDuration, getStatusBadgeClass, getStatusLabel } from '../../../../core/helpers/solution';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, NgClass, NgFor, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton, MatAnchor, MatButton } from '@angular/material/button';

@Component({
    selector: 'app-solucao-page',
    templateUrl: './solucao-page.component.html',
    styleUrl: './solucao-page.component.scss',
    standalone: true,
    imports: [MatIconButton, MatTooltip, MatIcon, NgIf, NgClass, MatAnchor, MatProgressSpinner, MatButton, MatTabGroup, MatTab, MatTabLabel, MatFormField, MatLabel, MatInput, MatSuffix, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgFor, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator, DatePipe]
})
export class SolucaoPageComponent implements OnInit {
isLoading = true;
  hasError = false;
  solutionData: SolutionDto | null = null;

  dataSourceTeachers = new MatTableDataSource<TimetableDto>([]);
  dataSourceClassrooms = new MatTableDataSource<TimetableDto>([]);

  getStatusLabel = getStatusLabel

  getStatusBadgeClass = getStatusBadgeClass

  formatDuration = formatDuration

  displayedColumns = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  @ViewChild('paginatorTeachers') paginatorTeachers!: MatPaginator;
  @ViewChild('sortTeachers') sortTeachers!: MatSort;
  
  @ViewChild('paginatorClassrooms') paginatorClassrooms!: MatPaginator;
  @ViewChild('sortClassrooms') sortClassrooms!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private solucoesService: SolucoesService
  ) {}

  ngOnInit(): void {
    const solutionId = this.route.snapshot.paramMap.get('solucaoId');
    const instituicaoId = this.route.snapshot.paramMap.get('instituicaoId');

    console.log(solutionId, instituicaoId);


    if (solutionId) {
      this.loadSolutionData(Number(instituicaoId), Number(solutionId));
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
  }

  loadSolutionData(instituicaoId: number, solucaoId: number) {
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
      error: (err) => {
        console.error('Erro ao buscar solução', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  fetchJsonContent(url: string) {
    this.http.get<SolverResponseDto>(url).subscribe({
      next: (response) => {
        this.dataSourceTeachers.data = response.teachers || [];
        this.dataSourceClassrooms.data = response.classrooms || [];
        
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
      error: (err) => {
        console.error('Erro ao baixar JSON', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<TimetableDto>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
    if (dataSource.paginator) dataSource.paginator.firstPage();
  }

  setupFilterPredicate(dataSource: MatTableDataSource<TimetableDto>) {
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
        this.router.navigate(['/admin/instituicoes', this.solutionData.institutionId]);
    } else {
        window.history.back();
    }
  }
}