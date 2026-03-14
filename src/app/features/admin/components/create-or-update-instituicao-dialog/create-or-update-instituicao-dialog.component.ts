import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { MatError,MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';

import type { InstituicaoCreateDto, InstituicaoDto, InstituicaoUpdateDto } from '../../../../core/interfaces/instituicao';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';

@Component({
    selector: 'app-create-or-update-instituicao-dialog',
    templateUrl: './create-or-update-instituicao-dialog.component.html',
    styleUrl: './create-or-update-instituicao-dialog.component.scss',
    standalone: true,
    imports: [MatToolbar, MatProgressSpinner, MatDialogContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatDialogActions, MatButton]
})
export class CreateOrUpdateInstituicaoDialogComponent implements OnInit {

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    code: new FormControl<string | null>("")
  });
  public isEditMode = false;
  public isLoading = false;
  public dialogTitle = '';

  private instituicoesService = inject(InstituicoesService);
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<CreateOrUpdateInstituicaoDialogComponent>);
  public data: InstituicaoDto | null = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.dialogTitle = this.isEditMode ? 'Editar Instituição' : 'Nova Instituição';
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        code: this.data.code
      });
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.form.getRawValue();

    const saveObservable = this.isEditMode && formData.id != null
      ? this.instituicoesService.updateById(formData.id, { ...formData, user: 0 } as InstituicaoUpdateDto)
      : this.instituicoesService.create(formData as InstituicaoCreateDto);

    saveObservable.subscribe({
      next: (instituicaoSalva) => {
        this.isLoading = false;
        this.snackBar.open(`Instituição "${instituicaoSalva.name}" salva com sucesso!`, 'Fechar', { duration: 3000 });
        this.dialogRef.close(instituicaoSalva);
      },
      error: (err: unknown) => {
        this.isLoading = false;
        console.error('Erro ao salvar instituição', err);
        this.snackBar.open('Ocorreu um erro ao salvar. Tente novamente.', 'Fechar', { duration: 5000, panelClass: 'snackbar-error' });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}