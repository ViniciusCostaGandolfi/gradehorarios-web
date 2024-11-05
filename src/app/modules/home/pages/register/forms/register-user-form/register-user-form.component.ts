import { Component } from '@angular/core';
import { RegisterUserFormService } from '../../../../../../core/services/auth/register-forms/register-user-form/register-user-form.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrl: './register-user-form.component.scss'
})
export class RegisterUserFormComponent {


  constructor(public userForm: RegisterUserFormService) {}



}
