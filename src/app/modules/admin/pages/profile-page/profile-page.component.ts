import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentlyUserService } from '../../../../core/services/currently-user/currently-user.service';
import { TokenUserDto, UserDto } from '../../../../core/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  isLoading = false;

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.email]), // E-mail não editável
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private currentlyUserService: CurrentlyUserService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentlyUserService.getUser().subscribe((user: TokenUserDto | null) => {
      console.log(user)
      if (user) {
        this.form.patchValue(user.user); // Preenche os campos com os dados do usuário
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackbar.open('Preencha os campos corretamente!', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    
    // Aqui você faria a requisição para atualizar os dados do usuário
    setTimeout(() => {
      this.isLoading = false;
      this.snackbar.open('Dados atualizados com sucesso!', 'Fechar', { duration: 3000 });
    }, 2000);
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
  
    if (this.form.controls.phone.value !== formattedValue) {
      this.form.controls.phone.setValue(formattedValue, { emitEvent: false });
    }
  }
}
