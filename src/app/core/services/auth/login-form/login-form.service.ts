import { Injectable } from '@angular/core';
import { MerchantUserLogin } from '../../../interfaces/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  private loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  isCompleted(): boolean {
    return this.loginForm.valid;
  }

  getData(): MerchantUserLogin {
      return this.loginForm.value as MerchantUserLogin;
  }

  get formGroup() {
    return this.loginForm;
  }

}
