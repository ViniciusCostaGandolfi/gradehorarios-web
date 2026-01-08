import { Component, Inject, OnInit } from '@angular/core';
import { InstituicoesService } from '../../../../core/services/instituicoes/instituicoes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstituicaoCreateDto, InstituicaoDto, InstituicaoUpdateDto } from '../../../../core/interfaces/instituicao';

@Component({
  selector: 'app-create-or-update-instituicao-dialog',
  templateUrl: './create-or-update-instituicao-dialog.component.html',
  styleUrl: './create-or-update-instituicao-dialog.component.scss'
})
export class CreateOrUpdateInstituicaoDialogComponent implements OnInit {

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    code: new FormControl<string | null>("")
  });
  public isEditMode: boolean = false;
  public isLoading: boolean = false;
  public dialogTitle: string = '';

  constructor(
    private instituicoesService: InstituicoesService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateOrUpdateInstituicaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InstituicaoDto 
  ) {
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.dialogTitle = this.isEditMode ? 'Editar Instituição' : 'Nova Instituição';
    console.log(this.data.code)
    if (this.isEditMode) {
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

    const saveObservable = this.isEditMode
      ? this.instituicoesService.updateById(formData as InstituicaoUpdateDto)
      : this.instituicoesService.create(formData as InstituicaoCreateDto);

    saveObservable.subscribe({
      next: (instituicaoSalva) => {
        this.isLoading = false;
        this.snackBar.open(`Instituição "${instituicaoSalva.name}" salva com sucesso!`, 'Fechar', { duration: 3000 });
        this.dialogRef.close(instituicaoSalva);
      },
      error: (err) => {
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