import { Component } from '@angular/core';
import { RegisterMerchantFormService } from '../../../../../../core/services/auth/register-forms/register-merchant-form/register-merchant-form.service';

@Component({
  selector: 'app-register-merchant-form',
  templateUrl: './register-merchant-form.component.html',
  styleUrl: './register-merchant-form.component.scss'
})
export class RegisterMerchantFormComponent {



    constructor(
      public merchantForm: RegisterMerchantFormService
    ) {}

    onSubmit(event: Event) {
      event.preventDefault();
    }

}
