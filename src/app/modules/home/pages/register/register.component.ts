import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { RegisterMerchantFormComponent } from './forms/register-merchant-form/register-merchant-form.component';
import { RegisterUserFormComponent } from './forms/register-user-form/register-user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RegisterUserFormService } from '../../../../core/services/auth/register-forms/register-user-form/register-user-form.service';
import { RegisterMerchantFormService } from '../../../../core/services/auth/register-forms/register-merchant-form/register-merchant-form.service';
import { DialogErrorContentComponent } from '../../../../shared/dialog-error-content/dialog-error-content.component';

@Component({
  selector: 'app-register',
  providers: [
    AuthService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {


  
  public isLoading = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    public userForm: RegisterUserFormService,
    public merchantForm: RegisterMerchantFormService

    ) {}

  

  onSubmit() {
      if (this.userForm.formGroup.valid && this.merchantForm.formGroup.valid) {

          this.isLoading = true;
          this.authService.createMerchant(this.merchantForm.getData(), this.userForm.getData()).subscribe({
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
