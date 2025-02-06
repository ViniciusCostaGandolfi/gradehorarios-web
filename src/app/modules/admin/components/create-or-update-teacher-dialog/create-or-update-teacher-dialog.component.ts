import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullTeacherDto} from '../../../../core/interfaces/teacher-dto';
import { DisciplineDto } from '../../../../core/interfaces/discipline-dto';
import { ClassroomDto } from '../../../../core/interfaces/classroom-dto';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { ClassroomsService } from '../../../../core/services/classrooms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeachersService } from '../../../../core/services/teachers.service';
import { Preference, preferenceToText } from '../../../../core/interfaces/preference';

@Component({
  selector: 'app-create-or-update-teacher-dialog',
  templateUrl: './create-or-update-teacher-dialog.component.html',
  styleUrls: ['./create-or-update-teacher-dialog.component.scss']
})
export class CreateOrUpdateTeacherDialogComponent implements OnInit {
  teacherForm!: FormGroup;
  disciplines: DisciplineDto[] = [];
  classrooms: ClassroomDto[] = [];
  preferenceToText = preferenceToText

  constructor(
    private disciplinesService: DisciplinesService,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateOrUpdateTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teacher?: FullTeacherDto; collegeId: number }
  ) {}

  ngOnInit(): void {
    this.teacherForm = new FormGroup({
      id: new FormControl(this.data?.teacher?.id),
      name: new FormControl(this.data?.teacher?.name ?? '', [Validators.required]),
      collegeId: new FormControl(this.data?.collegeId),
      preferDoubleClass: new FormControl(this.data?.teacher?.preferDoubleClass ?? Preference.IRRELEVANT),
      preferFirstClass: new FormControl(this.data?.teacher?.preferFirstClass ?? Preference.IRRELEVANT),
      preferLastClass: new FormControl(this.data?.teacher?.preferLastClass ?? Preference.IRRELEVANT),

      teacherAvailability: new FormGroup({
        id: new FormControl(this.data?.teacher?.teacherAvailability?.id),
        monday: new FormControl(this.data?.teacher?.teacherAvailability?.monday ?? Preference.IRRELEVANT),
        tuesday: new FormControl(this.data?.teacher?.teacherAvailability?.tuesday ?? Preference.IRRELEVANT),
        wednesday: new FormControl(this.data?.teacher?.teacherAvailability?.wednesday ?? Preference.IRRELEVANT),
        thursday: new FormControl(this.data?.teacher?.teacherAvailability?.thursday ?? Preference.IRRELEVANT),
        friday: new FormControl(this.data?.teacher?.teacherAvailability?.friday ?? Preference.IRRELEVANT),
        saturday: new FormControl(this.data?.teacher?.teacherAvailability?.saturday ?? Preference.UNPREFERABLE),
        sunday: new FormControl(this.data?.teacher?.teacherAvailability?.sunday ?? Preference.UNPREFERABLE),
      })
    });
    
  }

  canPreferFirstClass() {
    return (
      this.teacherForm.get('preferLastClass')?.value === Preference.IRRELEVANT  ||   
      this.teacherForm.get('preferLastClass')?.value === Preference.UNPREFERABLE
    );
  }

  canPreferLastClass() {
    return (
      this.teacherForm.get('preferFirstClass')?.value === Preference.IRRELEVANT ||  
      this.teacherForm.get('preferFirstClass')?.value === Preference.UNPREFERABLE
    );
  }




  
  onSubmit(): void {
    if (this.teacherForm.valid) {
      const teacher: FullTeacherDto = this.teacherForm.value as FullTeacherDto;
      this.teachersService.createOrUpdate(teacher, this.data.collegeId).subscribe({
        next: (updatedTeacher) => {
          this.snackbar.open('Professor salvo com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(updatedTeacher);
        },
        error: () => {
          this.snackbar.open('Erro ao salvar o professor. Tente novamente.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.snackbar.open('Formulário inválido. Verifique os campos!', 'Fechar', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // getErrors() {
  //   console.log(this.teacherForm.valid)
  //   console.log(this.teacherForm.errors)
  //   console.log(this.teacherForm.value)
  // }
}
