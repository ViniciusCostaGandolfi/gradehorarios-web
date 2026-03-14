import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatError,MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth/auth.service';
import { DefaultFormContainerComponent } from '../../../../shared/default-form-container/default-form-container.component';
import { DefaultLayoutComponent } from '../../../../shared/default-layout/default-layout.component';
import { SpinnerButtonComponent } from '../../../../shared/spinner-button/spinner-button.component';

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrls: ['./reset-password-page.component.scss'],
    standalone: true,
    imports: [DefaultLayoutComponent, DefaultFormContainerComponent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, SpinnerButtonComponent]
})
export class ResetPasswordPageComponent implements OnInit {
  isLoading = false;
  token = '';

  form = new FormGroup({
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
  });

  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.token = params['resetPasswordToken'] as string;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackbar.open('Preencha os campos corretamente!', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.snackbar.open('As passwords não coincidem!', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    const payload = {
      token: this.token,
      newPassword: this.form.value.password ?? ''
    };

    this.authService.resetPassword(payload).subscribe({
      next: () => {
        this.snackbar.open('Senha redefinida com sucesso!', 'Fechar', { duration: 3000 });
        void this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Erro ao redefinir password:', error);
        this.snackbar.open('Erro ao redefinir password. Tente novamente.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
