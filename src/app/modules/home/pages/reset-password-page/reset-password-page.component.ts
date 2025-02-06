import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  isLoading: boolean = false;
  token: string = '';

  form = new FormGroup({
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['resetPasswordToken'];
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackbar.open('Preencha os campos corretamente!', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.snackbar.open('As senhas não coincidem!', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const payload = {
      token: this.token,
      newPassword: this.form.value.password as string
    };

    this.authService.resetPassword(payload).subscribe({
      next: () => {
        this.snackbar.open('Senha redefinida com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao redefinir senha:', error);
        this.snackbar.open('Erro ao redefinir senha. Tente novamente.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
