import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss'],
    standalone: true,
    imports: [DefaultLayoutComponent, DefaultFormContainerComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatError, SpinnerButtonComponent]
})
export class ForgotPasswordPageComponent {

  isLoading: boolean = false;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackbar.open('Por favor, insira um e-mail válido.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const email = this.form.value.email as string;

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.snackbar.open('Enviamos um e-mail com um link para redefinição de password.', 'Fechar', { duration: 4000 });
        this.router.navigate(['/entrar']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao solicitar redefinição de password:', error);
        this.snackbar.open('Erro ao enviar e-mail. Verifique se o e-mail está correto.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
