import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisciplinesService } from '../../../../core/services/disciplines.service';
import { DisciplineDto } from '../../../../core/interfaces/discipline-dto';


@Component({
  selector: 'app-create-or-update-discipline-dialog',
  templateUrl: './create-or-update-discipline-dialog.component.html',
  styleUrls: ['./create-or-update-discipline-dialog.component.scss'],
})
export class CreateOrUpdateDisciplineDialogComponent {
  disciplineForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    code: new FormControl<string>(''),
  });
  

  constructor(
    private readonly dialogRef: MatDialogRef<CreateOrUpdateDisciplineDialogComponent>,
    private readonly disciplinesService: DisciplinesService,
    private readonly snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {discipline: DisciplineDto | undefined, collegeId: number}
  ) {
    if (data.discipline) {
      this.disciplineForm.setValue({
        id: data.discipline?.id || null,
        name: data.discipline?.name,
        code: data.discipline?.code
      });
    }
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.disciplineForm.valid) {
      const discipline: DisciplineDto = this.disciplineForm.value as DisciplineDto;
      this.disciplinesService.createOrUpdate(discipline, this.data.collegeId).subscribe({
        next: () => {
          this.snackbar.open('A disciplina foi salva com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(discipline);
        },
        error: (error) => {
          this.snackbar.open(error.error || 'Erro ao salvar a disciplina', 'Fechar');
        },
      });
    }
  }
}
