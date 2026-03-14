import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatError,MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import type { UserLogin } from '../../../../core/interfaces/auth';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';
import { GoogleBtnComponent } from '../../../../shared/google-btn/google-btn.component';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [DefaultLayoutComponent, DefaultFormContainerComponent, RouterLink, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, SpinnerButtonComponent, GoogleBtnComponent]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  isLoading = false;
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  handleGoogleLogin(token: string): void {
    this.isLoading = true;
    this.authService.loginWithGoogle(token).subscribe({
      next: () => {
        this.snackbar.open('Login com Google realizado!', 'Fechar', { duration: 3000 });
        void this.router.navigate(['/admin']);
        this.isLoading = false;
      },
      error: () => {
        this.snackbar.open('Erro no login com Google.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.value as UserLogin).subscribe({
        next: () => {
          this.snackbar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
          this.isLoading = false;
          void this.router.navigate(['/admin']);
        },
        error: (error: unknown) => {
          console.error('Erro ao realizar login:', error);
          // Tratamento para evitar 'Unsafe member access'
          const err = error as { error?: { detail?: string } };
          const errorMessage = err.error?.detail ?? 'Erro ao realizar login. Tente novamente.';
          this.snackbar.open(errorMessage, 'Fechar', { duration: 8000 });
          this.isLoading = false;
        }
      });
    }
  }
}