import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormService } from '../../../../core/services/auth/login-form/login-form.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    isLoading: boolean = false;
    
    constructor(
      public loginForm: LoginFormService,
      private authService: AuthService,
      private router: Router,
      private dialog: MatDialog,

    ) {}

    onSubmit() {
      if (this.loginForm.isCompleted()) {
        this.isLoading = true
        this.authService.login(this.loginForm.getData()).subscribe({
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
}
