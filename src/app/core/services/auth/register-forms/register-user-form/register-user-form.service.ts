import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserFormService {
  public userForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  getData(): User {
      return this.userForm.value as User;
  }

  get formGroup() {
    return this.userForm
  }
}
