import { Component } from '@angular/core';
import { CollegeDto, FullCollegeDto } from '../../../../core/interfaces/college';
import { CollegesService } from '../../../../core/services/colleges/colleges.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateCollegeDialogComponent } from '../../components/create-or-update-college-dialog/create-or-update-college-dialog.component';
import { DisciplineDto } from '../../../../core/interfaces/discipline-dto';
import { CreateOrUpdateDisciplineDialogComponent } from '../../components/create-or-update-discipline-dialog/create-or-update-discipline-dialog.component';
import { ClassroomDto } from '../../../../core/interfaces/classroom-dto';
import { CreateOrUpdateClassroomDialogComponent } from '../../components/create-or-update-classroom-dialog/create-or-update-classroom-dialog.component';
import { CreateOrUpdateTeacherDialogComponent } from '../../components/create-or-update-teacher-dialog/create-or-update-teacher-dialog.component';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { ClassroomsService } from '../../../../core/services/classrooms.service';
import { TeachersService } from '../../../../core/services/teachers.service';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { TeacherDto } from '../../../../core/interfaces/teacher-dto';
import { SimulateDialogComponent } from '../../components/simulate-dialog/simulate-dialog.component';
import { TimetableSolverService } from '../../../../core/services/timetable-solver.service';
import { UploadTableDialogComponent } from '../../components/upload-table-dialog/upload-table-dialog.component';


@Component({
  selector: 'app-colleges-list-page',
  templateUrl: './colleges-list-page.component.html',
  styleUrl: './colleges-list-page.component.scss'
})
export class CollegesListPageComponent {

  isLoading = false;

  colleges: FullCollegeDto[] = [];

  constructor(
    private collegesService: CollegesService,
    private disciplinesService: DisciplinesService,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    private  snackbar: MatSnackBar,
    private timetableService: TimetableSolverService,
    private dialog: MatDialog
  ) {
    this.refreshColleges()
  }

  public updateOrCreateCollege(data?: { college: CollegeDto}) {
    this.dialog.open(CreateOrUpdateCollegeDialogComponent, {
      data: data,
      width: '50vw',
      height: '50vh'
    }).afterClosed().subscribe((value) => this.refreshColleges())
  }

  public simulateCollege(data: { college: CollegeDto}) {
    this.dialog.open(SimulateDialogComponent, {
      data: data,
      width: '50vw',
      height: '80vh'
    }).afterClosed().subscribe((value) => this.refreshColleges())
  }

  public updateOrCreateDiscipline(event: MouseEvent, data: { discipline?: DisciplineDto, collegeId?: number}) {
    event.stopPropagation()

    this.dialog.open(CreateOrUpdateDisciplineDialogComponent, {
      data: data,
      width: '50vw',
      height: '50vh'
    }).afterClosed().subscribe((value) => this.refreshColleges())
  }

  public updateOrCreateClassroom(event: MouseEvent, data: {classroom?: ClassroomDto, collegeId?: number}) {
    event.stopPropagation()

    this.dialog.open(CreateOrUpdateClassroomDialogComponent, {
      data: data,
      width: '70vw',
      height: '80vh'
    }).afterClosed().subscribe(() => this.refreshColleges())
  }

  public uploadTable(event: MouseEvent) {
    event.stopPropagation()

    this.dialog.open(UploadTableDialogComponent, {
      width: '70vw',
      height: '80vh'
    }).afterClosed().subscribe(() => this.refreshColleges())
  }

  public updateOrCreateTeacher(event: MouseEvent, data: {teacher?: TeacherDto, collegeId?: number}) {
    event.stopPropagation()

    this.dialog.open(CreateOrUpdateTeacherDialogComponent, {
      data: data,
      width: '90vw',
      height: '90vh'
    }).afterClosed().subscribe(() => this.refreshColleges())

  }

  deleteCollege(collegeId: number): void {
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


  deleteDiscipline(disciplineId: number, collegeId: number): void {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta disciplina?' },
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.disciplinesService.deleteDiscipline(disciplineId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Disciplina excluída com sucesso!', 'Fechar', { duration: 3000 });
            this.refreshColleges();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir a disciplina. Tente novamente.', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }
  
  deleteTeacher(teacherId: number, collegeId: number): void {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir este professor?' },
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.teachersService.deleteTeacher(teacherId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Professor excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.refreshColleges();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir o professor. Tente novamente.', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }
  
  deleteClassroom(classroomId: number, collegeId: number): void {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta turma?' },
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.classroomsService.deleteClassroom(classroomId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Turma excluída com sucesso!', 'Fechar', { duration: 3000 });
            this.refreshColleges();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir a turma. Tente novamente.', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }


  deleteSolution(solutionId: number, collegeId: number): void {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta grade?' },
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.timetableService.deleteSolution(solutionId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Grade excluída com sucesso!', 'Fechar', { duration: 3000 });
            this.refreshColleges();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir a grade. Tente novamente.', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }
  
  
  refreshColleges(): void {
    this.isLoading = true;
    this.collegesService.getAllFullColleges().subscribe({
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
  
  


}
