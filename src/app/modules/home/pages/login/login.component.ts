import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../../../core/interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    isLoading: boolean = false;
    form = new FormGroup({
      email: new FormControl<string>('', [Validators.email, Validators.required]),
      password: new FormControl<string>('', [Validators.required])

    })
    
    constructor(
      private authService: AuthService,
      private router: Router,
      private snackbar: MatSnackBar

    ) {}

    onSubmit() {
      if (this.form.valid) {
        this.isLoading = true;
        this.authService.login(this.form.value as UserLogin).subscribe({
          next: () => {
            this.snackbar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
            this.isLoading = false;
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            console.error('Erro ao realizar login:', error);
            const errorMessage = error?.error?.detail || 'Erro ao realizar login. Tente novamente.';
            this.snackbar.open(errorMessage, 'Fechar', { duration: 8000 });
            this.isLoading = false;
          }
        });
      }
    }
  }