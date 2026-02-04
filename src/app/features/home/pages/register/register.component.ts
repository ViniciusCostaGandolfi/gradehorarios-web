import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserCreation } from '../../../../core/interfaces/auth';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatAnchor } from '@angular/material/button';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';

@Component({
    selector: 'app-register',
    providers: [
        AuthService
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    standalone: true,
    imports: [DefaultLayoutComponent, DefaultFormContainerComponent, CommonModule, RouterLink, ReactiveFormsModule, MatInputModule, SpinnerButtonComponent, GoogleSigninButtonModule]
})
export class RegisterComponent  {


  
  public isLoading = false;

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  })



  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
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
          this.authService.createUser(this.form.value as UserCreation).subscribe({
            next: (response) => {
              const tokenResponse = response;
              console.log(tokenResponse)
              this.isLoading = false;
              this.router.navigate(['/admin']);
            },
            error: (error) => {
              console.error('Error:', error);
              this.dialog.open(DialogErrorContentComponent, {data: {
                message: error.error.detail
              }})
              this.isLoading = false;
            }
          });
      }
  }

  loginWithGoogle() {
    this.isLoading = true;
    

    console.log('Iniciar fluxo de login com Google');
    
    setTimeout(() => this.isLoading = false, 1000);
  }

  formatPhone(value: string): void {
    if (!value) return;
  
    const cleaned = value.replace(/\D/g, '');
  
    let formattedValue = cleaned;
  
    if (cleaned.length > 2) {
      formattedValue = `(${cleaned.slice(0, 2)}) `;
  
      if (cleaned.length > 7) {
        formattedValue += `${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
      } else if (cleaned.length > 2) {
        formattedValue += cleaned.slice(2);
      }
    }
  }
}
