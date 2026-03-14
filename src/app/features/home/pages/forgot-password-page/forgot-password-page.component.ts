import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatError,MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth/auth.service';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss'],
    standalone: true,
    imports: [DefaultLayoutComponent, DefaultFormContainerComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, SpinnerButtonComponent]
})
export class ForgotPasswordPageComponent {

  isLoading = false;

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6)
    ]),
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackbar.open('Por favor, insira um e-mail válido.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const email = this.form.value.email ?? '';

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.snackbar.open('Enviamos um e-mail com um link para redefinição de password.', 'Fechar', { duration: 4000 });
        void this.router.navigate(['/entrar']);
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Erro ao solicitar redefinição de password:', error);
        this.snackbar.open('Erro ao enviar e-mail. Verifique se o e-mail está correto.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
