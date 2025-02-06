import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassroomDto, FullClassroomDto } from '../../../../core/interfaces/classroom-dto';
import { DisciplineDto } from '../../../../core/interfaces/discipline-dto';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassroomsService } from '../../../../core/services/classrooms.service';
import { TeacherDisciplineClassroomDto, TeacherDto } from '../../../../core/interfaces/teacher-dto';
import { TeachersService } from '../../../../core/services/teachers.service';

@Component({
  selector: 'app-create-or-update-classroom-dialog',
  templateUrl: './create-or-update-classroom-dialog.component.html',
  styleUrls: ['./create-or-update-classroom-dialog.component.scss']
})
export class CreateOrUpdateClassroomDialogComponent implements OnInit {
  classroomForm!: FormGroup;
  weekForm!: FormGroup;

  disciplines: DisciplineDto[] = [];
  teachers: TeacherDto[] = [];

  constructor(
    private disciplinesService: DisciplinesService,
    private snackbar: MatSnackBar,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    public dialogRef: MatDialogRef<CreateOrUpdateClassroomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classroom?: FullClassroomDto; collegeId: number }
  ) {
    this.classroomForm = new FormGroup({
      id: new FormControl(this.data?.classroom?.id),
      name: new FormControl(this.data?.classroom?.name, [Validators.required]),
      collegeId: new FormControl(this.data.collegeId),
      classroomDailySchedule: new FormGroup({
        id: new FormControl(this.data?.classroom?.classroomDailySchedule?.id),
        mondayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.mondayClasses ?? 5),
        tuesdayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.tuesdayClasses ?? 5),
        wednesdayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.wednesdayClasses ?? 5),
        thursdayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.thursdayClasses ?? 5),
        fridayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.fridayClasses ?? 5),
        saturdayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.saturdayClasses ?? 0),
        sundayClasses: new FormControl(this.data?.classroom?.classroomDailySchedule?.sundayClasses ?? 0),
      }),
      teacherDisciplineClassrooms: new FormArray([])
    });

    if (this.data?.classroom?.teacherDisciplineClassrooms) {
      console.log(this.data)
      this.data.classroom.teacherDisciplineClassrooms.forEach(tdc =>
        this.addDisciplineClassroom(tdc)
      );
    } else {
      this.addDisciplineClassroom()
    }

  }

  ngOnInit(): void {
    this.loadDisciplines();
    this.loadTeachers();
  }

  loadDisciplines(): void {
    this.disciplinesService.getAllByCollegeId(this.data.collegeId).subscribe({
      next: (disciplines) => (this.disciplines = disciplines),
      error: () => this.snackbar.open('Erro ao carregar disciplinas', 'Fechar', { duration: 3000 })
    });
  }

  loadTeachers(): void {
    this.teachersService.getAllByCollegeId(this.data.collegeId).subscribe({
      next: (teachers) => (this.teachers = teachers),
      error: () => this.snackbar.open('Erro ao carregar professores', 'Fechar', { duration: 3000 })
    });
  }

  get teacherDisciplineClassrooms(): FormArray {
    return this.classroomForm.get('teacherDisciplineClassrooms') as FormArray;
  }

  addDisciplineClassroom(schedule?: TeacherDisciplineClassroomDto): void {
    console.log(schedule)
    this.teacherDisciplineClassrooms.push(
      new FormGroup({
        id: new FormControl(schedule?.id),
        disciplineId: new FormControl(schedule?.disciplineId, [Validators.required]),
        teacherId: new FormControl(schedule?.teacherId, [Validators.required]),
        classroomId: new FormControl(schedule?.classroomId, []),
        totalClasses: new FormControl(schedule?.totalClasses || 2, [Validators.required, Validators.min(1)])
      })
    );
  }

  removeDisciplineClassroom(index: number): void {
    this.teacherDisciplineClassrooms.removeAt(index);
  }




  onSubmit() {
    if (this.classroomForm.valid) {
      const classroom: ClassroomDto = this.classroomForm.value as ClassroomDto;
      this.classroomsService.createOrUpdate(classroom, this.data.collegeId).subscribe({
        next: (updatedClassroom) => {
          this.snackbar.open('A sala de aula foi salva com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(updatedClassroom);
        },
        error: (error) => {
          this.snackbar.open('Erro ao salvar a sala de aula. Tente novamente.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.snackbar.open('Formulário inválido. Verifique os campos!', 'Fechar', { duration: 3000 });
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
}
