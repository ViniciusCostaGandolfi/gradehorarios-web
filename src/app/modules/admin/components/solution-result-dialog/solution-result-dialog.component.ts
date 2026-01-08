import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolutionDto } from '../../../../core/interfaces/solucao';

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
  styleUrls: ['./solution-result-dialog.component.scss']
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

  constructor(
    public dialogRef: MatDialogRef<SolutionResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SolutionDto,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.data.outputPath) {
      this.fetchJsonContent(this.data.outputPath);
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
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

  onClose(): void {
    this.dialogRef.close();
  }
}