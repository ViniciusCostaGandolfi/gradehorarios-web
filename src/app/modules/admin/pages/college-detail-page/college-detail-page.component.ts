import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CollegeDto, FullCollegeDto } from '../../../../core/interfaces/college';
import { CollegesService } from '../../../../core/services/colleges/colleges.service';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { ClassroomsService } from '../../../../core/services/classrooms.service';
import { TeachersService } from '../../../../core/services/teachers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimetableSolverService } from '../../../../core/services/timetable-solver.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateCollegeDialogComponent } from '../../components/create-or-update-college-dialog/create-or-update-college-dialog.component';
import { SimulateDialogComponent } from '../../components/simulate-dialog/simulate-dialog.component';
import { DisciplineDto } from '../../../../core/interfaces/discipline-dto';
import { ClassroomDto, FullClassroomDto } from '../../../../core/interfaces/classroom-dto';
import { CreateOrUpdateClassroomDialogComponent } from '../../components/create-or-update-classroom-dialog/create-or-update-classroom-dialog.component';
import { UploadTableDialogComponent } from '../../components/upload-table-dialog/upload-table-dialog.component';
import { dayTranslations, FullTeacherDto, TeacherDto } from '../../../../core/interfaces/teacher-dto';
import { CreateOrUpdateTeacherDialogComponent } from '../../components/create-or-update-teacher-dialog/create-or-update-teacher-dialog.component';
import { CanDeleteDialogComponent } from '../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { SolutionDetailDialogComponent } from '../../components/solution-detail-dialog/solution-detail-dialog.component';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';
import { SolutionDto } from '../../../../core/interfaces/solution-dto';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-college-detail-page',
  templateUrl: './college-detail-page.component.html',
  styleUrl: './college-detail-page.component.scss'
})
export class CollegeDetailPageComponent {

  isLoading = false;

  isMobile = false;

  college: FullCollegeDto | null = null;

  editableDisciplines: DisciplineDto[] = [];

  editableTeachers: FullTeacherDto[] = [];

  editableClassrooms: FullClassroomDto[] = [];

  @ViewChild('classroomTable') classroomTable!: MatTable<FullClassroomDto>;
  @ViewChild('teacherTable') teacherTable!: MatTable<FullTeacherDto>;
  @ViewChild('disciplineTable') disciplineTable!: MatTable<DisciplineDto>;
  @ViewChild('solutionTable') solutionTable!: MatTable<SolutionDto>;


  hasDisciplinesChanges = false;

  dayTranslations = dayTranslations

  constructor(
    private collegesService: CollegesService,
    private disciplinesService: DisciplinesService,
    private classroomsService: ClassroomsService,
    private windowWidth: WindowWidthService,
    private teachersService: TeachersService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,

    private timetableService: TimetableSolverService,
    private dialog: MatDialog
  ) {
    this.loadCollege()
  }

  ngOnInit() {
    this.windowWidth.isMobile().subscribe(value => {
      this.isMobile = value;
    });
  }
  ngAfterViewInit() {
    this.rerenderTables();
  }

  updateOrCreateTeacher(event: MouseEvent, data: { teacher?: TeacherDto; collegeId?: number }) {
    event.stopPropagation();

    this.dialog.open(CreateOrUpdateTeacherDialogComponent, {
      data: data,
      width: '90vw',
      height: '90vh'
    }).afterClosed().subscribe((updatedTeacher: FullTeacherDto) => {
      if (updatedTeacher && this.college && this.college.teachers) {
        const index = this.college?.teachers.findIndex(t => t.id === updatedTeacher.id);
        if (index !== -1) {
          this.college.teachers[index] = updatedTeacher;
        } else {
          this.college.teachers = [...this.college?.teachers, updatedTeacher];
        }
        this.college.teachers.sort((a, b) => a.name.localeCompare(b.name));

        this.rerenderTables()
      }
    });
  }


  rerenderTables(): void {
    if (this.classroomTable) {
      this.classroomTable.renderRows();
    }
    if (this.teacherTable) {
      this.teacherTable.renderRows();
    }
    if (this.disciplineTable) {
      this.disciplineTable.renderRows();
    }
  }



  loadCollege(): void {
    this.isLoading = true;
    const collegeIdStr = this.route.snapshot.paramMap.get('collegeId');
    const collegeId = collegeIdStr ? parseInt(collegeIdStr, 10) : NaN;

    if (!isNaN(collegeId)) {
      this.collegesService.getCollegeById(collegeId).subscribe({
        next: (college) => {
          this.college = college;
          this.editableDisciplines = [...college.disciplines];
          this.isLoading = false;
        },
        error: () => {
          this.snackbar.open('Erro ao carregar a escola. Tente novamente.', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    } else {
      this.snackbar.open('ID da escola inválido.', 'Fechar', { duration: 3000 });
      this.isLoading = false;
    }
  }

  markAsDisciplinesChanged(): void {
    this.hasDisciplinesChanges = true;
  }



  

  addDiscipline(event: MouseEvent): void {
    event.stopPropagation()
    if (!this.college) return;

    const newDiscipline: DisciplineDto = { name: '', code: '', collegeId: this.college.id };

    this.editableDisciplines = [...this.editableDisciplines, newDiscipline];
  }

  saveDisciplinesChanges(): void {
    if (!this.college) return;

    this.editableDisciplines.forEach((discipline, i) => {
      this.disciplinesService.createOrUpdate(discipline, this.college!.id).subscribe();
    });

    this.snackbar.open('Mudanças salvas com sucesso!', 'Fechar', { duration: 2000 });

    this.hasDisciplinesChanges = false;

    this.disciplineTable.renderRows()
  }

  removeDisciplineFromList(index: number): void {
    this.editableDisciplines = this.editableDisciplines.filter((_, i) => i !== index);
  }


  deleteDiscipline(disciplineId: number, collegeId: number): void {
    if (!this.college) return;

    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: `Tem certeza que deseja deletar a disciplina?` }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.disciplinesService.deleteDiscipline(disciplineId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Discipliona deletada com sucesso!', 'Fechar', { duration: 3000 });
            this.loadCollege();
          },
          error: () => {
            this.snackbar.open('Erro ao deletar a disciplina. Tente novamente.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  updateOrCreateCollege(data?: { college: CollegeDto }) {
    this.dialog.open(CreateOrUpdateCollegeDialogComponent, {
      data: data,
      width: '50vw',
      height: '50vh'
    }).afterClosed().subscribe((value) => this.loadCollege())
  }

  simulateCollege(data: { college: CollegeDto }) {
    this.dialog.open(SimulateDialogComponent, {
      data: data,
      width: '50vw',
      height: '80vh'
    }).afterClosed().subscribe((solution) => {
      if (solution  && this.college && this.college.solutions) {
        const index = this.college.solutions.findIndex(c => c.id === solution.id);

        if (index !== -1) {
          this.college.solutions[index] = solution;
        } else {
          this.college.solutions = [...this.college.solutions, solution];
        }

        this.college.solutions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        this.solutionTable.renderRows()

      }
    })
  }




  updateOrCreateClassroom(event: MouseEvent, data: { classroom?: ClassroomDto; collegeId?: number }) {
    event.stopPropagation();

    this.dialog.open(CreateOrUpdateClassroomDialogComponent, {
      data: data,
      width: '70vw',
      height: '80vh'
    }).afterClosed().subscribe((updatedClassroom: FullClassroomDto) => {
      if (updatedClassroom && this.college && this.college.classrooms) {
        const index = this.college.classrooms.findIndex(c => c.id === updatedClassroom.id);

        if (index !== -1) {
          this.college.classrooms[index] = updatedClassroom;
        } else {
          this.college.classrooms = [...this.college.classrooms, updatedClassroom];
        }

        this.college.classrooms.sort((a, b) => a.name.localeCompare(b.name));
        this.classroomTable.renderRows()

      }
    });
  }


  uploadTable(event: MouseEvent) {
    event.stopPropagation()

    this.dialog.open(UploadTableDialogComponent, {
      width: '70vw',
      height: '80vh'
    }).afterClosed().subscribe(() => this.loadCollege())
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
            this.loadCollege();
          },
          error: () => {
            this.snackbar.open('Erro ao deletar a escola. Tente novamente.', 'Fechar', { duration: 3000 });
          }
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
            this.loadCollege();
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
            this.loadCollege();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir a grade. Tente novamente.', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }

  deleteTeacher(teacherId: number, collegeId: number): void {
    if (!this.college) return;
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta grade?' },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.teachersService.deleteTeacher(teacherId, collegeId).subscribe({
          next: () => {
            this.snackbar.open('Professor excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.loadCollege();
          },
          error: () => {
            this.snackbar.open('Erro ao excluir o professor.', 'Fechar', { duration: 3000 });
          }
        });
      }
    })

    
    
  }


  duplicateClassroom(originalClassroom: FullClassroomDto): void {
    if (!this.college) return;

    const duplicatedClassroom: FullClassroomDto = {
      ...originalClassroom,
      id: undefined,
      name: originalClassroom.name + ' (Cópia)',
      classroomDailySchedule: {
        ...originalClassroom.classroomDailySchedule,
        id: undefined
      },
      teacherDisciplineClassrooms: originalClassroom.teacherDisciplineClassrooms?.map(tdc => ({
        ...tdc,
        id: undefined,
      })) || []
    };


    this.dialog.open(CreateOrUpdateClassroomDialogComponent, {
      data: {
        classroom: duplicatedClassroom,
        collegeId: this.college.id
      },
      width: '70vw',
      height: '80vh'
    }).afterClosed().subscribe((value) => {
      if (value && this.college && this.college?.classrooms) {
        this.college.classrooms = [...this.college?.classrooms, value]
      }
    })
  }

  openSolutionDetails(solution: any): void {
    this.dialog.open(SolutionDetailDialogComponent, {
      data: { solution },
      width: '1000px',
      height: '80vh'
    });
  }
}

