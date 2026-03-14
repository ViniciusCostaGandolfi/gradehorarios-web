import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import type { UserCreation } from '../../../../core/interfaces/auth';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { GoogleBtnComponent } from '../../../../shared/google-btn/google-btn.component';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [DefaultLayoutComponent, DefaultFormContainerComponent, RouterLink, ReactiveFormsModule, MatInputModule, SpinnerButtonComponent, GoogleBtnComponent]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);

  public isLoading = false;

  form = new FormGroup({
    name: new FormControl<string>('', (c) => Validators.required(c)),
    email: new FormControl<string>('', [(c) => Validators.required(c), (c) => Validators.email(c)]),
    password: new FormControl<string>('', (c) => Validators.required(c)),
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
      this.authService.createUser(this.form.value as UserCreation).subscribe({
        next: () => {
          this.isLoading = false;
          void this.router.navigate(['/admin']);
        },
        error: (error: { error?: { detail?: string } }) => {
          console.error('Error:', error);
          const errorMessage = error.error?.detail ?? 'An error occurred';
          this.dialog.open(DialogErrorContentComponent, {
            data: {
              message: errorMessage
            }
          });
          this.isLoading = false;
        }
      });
    }
  }
}
