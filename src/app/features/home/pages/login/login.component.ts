import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../../../core/interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [DefaultLayoutComponent, DefaultFormContainerComponent, RouterLink, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatError, SpinnerButtonComponent, GoogleSigninButtonModule]
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
      private snackbar: MatSnackBar,
      private socialAuthService: SocialAuthService 
      ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.handleGoogleLogin(user.idToken);
      }
    });
  }

  handleGoogleLogin(token: string) {
    this.isLoading = true;
    this.authService.loginWithGoogle(token).subscribe({
      next: () => {
        this.snackbar.open('Login com Google realizado!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/admin']);
        this.isLoading = false;
      },
      error: (error) => {
        this.snackbar.open('Erro no login com Google.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

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