import { Component } from '@angular/core';
import { CollegeDto } from '../../../../core/interfaces/college';
import { CollegesService } from '../../../../core/services/colleges/colleges.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateCollegeDialogComponent } from '../../components/create-or-update-college-dialog/create-or-update-college-dialog.component';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { ClassroomsService } from '../../../../core/services/classrooms.service';
import { TeachersService } from '../../../../core/services/teachers.service';
import { TimetableSolverService } from '../../../../core/services/timetable-solver.service';
import { Router } from '@angular/router';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';


@Component({
  selector: 'app-colleges-list-page',
  templateUrl: './colleges-list-page.component.html',
  styleUrl: './colleges-list-page.component.scss'
})
export class CollegesListPageComponent {

  isLoading = false;

  colleges: CollegeDto[] = [];

  constructor(
    private collegesService: CollegesService,
    private disciplinesService: DisciplinesService,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    private  snackbar: MatSnackBar,
    private timetableService: TimetableSolverService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.refreshColleges()
  }

  public openCollege(id: number | undefined) {
    if (id) {
      this.router.navigate([`/admin/escolas/${id}`])
    }

  }

  public updateOrCreateCollege(data?: { college: CollegeDto}) {
    this.dialog.open(CreateOrUpdateCollegeDialogComponent, {
      data: data,
      width: '50vw',
      height: '50vh'
    }).afterClosed().subscribe((value) => this.refreshColleges())
  }

  
  refreshColleges(): void {
    this.isLoading = true;
    this.collegesService.getAllColleges().subscribe({
      next: (colleges) => {
        this.colleges = colleges;
        this.isLoading = false;
      },
      error: () => {
        this.snackbar.open('Erro ao carregar escolas. Tente novamente.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }


  deleteCollege(collegeId: number | undefined): void {
    if (!collegeId) {
      return
    }
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: `Tem certeza que deseja deletar a escola?` }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.collegesService.deleteCollege(collegeId).subscribe({
          next: () => {
            this.snackbar.open('Escola deletada com sucesso!', 'Fechar', { duration: 3000 });
            this.refreshColleges();
          },
          error: () => {
            this.snackbar.open('Erro ao deletar a escola. Tente novamente.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  
  


}
