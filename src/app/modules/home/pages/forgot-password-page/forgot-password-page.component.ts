import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
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
        this.snackbar.open('Enviamos um e-mail com um link para redefinição de senha.', 'Fechar', { duration: 4000 });
        this.router.navigate(['/entrar']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao solicitar redefinição de senha:', error);
        this.snackbar.open('Erro ao enviar e-mail. Verifique se o e-mail está correto.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
