import { HttpClient } from '@angular/common/http';
import type { OnInit} from '@angular/core';
import { Component, inject, ViewChild } from '@angular/core';
import { MatAnchor,MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import type { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow,MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';

import type { SolutionDto } from '../../../../core/interfaces/solucao';

// Interface exata do seu DTO Java
export interface TimetableDto {
  name: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface SolverResponseDto {
  teachers: TimetableDto[];
  classrooms: TimetableDto[];
}

@Component({
    selector: 'app-solution-result-dialog',
    templateUrl: './solution-result-dialog.component.html',
    styleUrls: ['./solution-result-dialog.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, MatIcon, MatProgressSpinner, MatButton, MatTabGroup, MatTab, MatTabLabel, MatAnchor, MatTooltip, MatFormField, MatLabel, MatInput, MatSuffix, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator]
})
export class SolutionResultDialogComponent implements OnInit {
  isLoading = true;
  hasError = false;

  dataSourceTeachers = new MatTableDataSource<TimetableDto>([]);
  dataSourceClassrooms = new MatTableDataSource<TimetableDto>([]);

  displayedColumns = ['name', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  @ViewChild('paginatorTeachers') paginatorTeachers!: MatPaginator;
  @ViewChild('sortTeachers') sortTeachers!: MatSort;
  
  @ViewChild('paginatorClassrooms') paginatorClassrooms!: MatPaginator;
  @ViewChild('sortClassrooms') sortClassrooms!: MatSort;

  public dialogRef = inject(MatDialogRef<SolutionResultDialogComponent>);
  public data: SolutionDto = inject(MAT_DIALOG_DATA);
  private http = inject(HttpClient);

  ngOnInit(): void {
    if (this.data.outputPath) {
      this.fetchJsonContent(this.data.outputPath);
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
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

  onClose(): void {
    this.dialogRef.close();
  }
}