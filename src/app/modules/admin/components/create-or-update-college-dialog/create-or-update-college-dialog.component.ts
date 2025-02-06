import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollegesService } from '../../../../core/services/colleges/colleges.service';
import { AreaType, CollegeDto, DependencyAdministrationType } from '../../../../core/interfaces/college';
import { StateRegistrationService } from '../../../../core/services/state-registration.service';

@Component({
  selector: 'app-create-or-update-college-dialog',
  templateUrl: './create-or-update-college-dialog.component.html',
  styleUrls: ['./create-or-update-college-dialog.component.scss'],
})
export class CreateOrUpdateCollegeDialogComponent {
  dependencyTypes = Object.values(DependencyAdministrationType)
  areaTypes = Object.values(AreaType)

  collegeForm = new FormGroup({
    id: new FormControl<number | null>(null),
    code: new FormControl<number | null>(null, [Validators.maxLength(8)]),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CreateOrUpdateCollegeDialogComponent>,
    private readonly collegesService: CollegesService,
    private readonly snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data?: { college: CollegeDto }
  ) {
    const college = data?.college;
  
  
    this.collegeForm.setValue({
      id: college?.id || null,
      code: college?.code || null,
      name: college?.name || ''
    });
  }
  
  close() {
    this.dialogRef.close()
  }
  
  

  onSubmit(): void {
    if (this.collegeForm.valid) {
      const college: CollegeDto = this.collegeForm.value as CollegeDto;
      this.collegesService.createOrUpdate(college).subscribe({
        next: () => {
          this.snackbar.open('A faculdade foi salva com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(college);
        },
        error: (error) => {
          this.snackbar.open(error.error || 'Erro ao salvar a faculdade', 'Fechar');
        },
      });
    }
  }
}
