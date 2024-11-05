import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentlyUserService } from '../../../../../core/services/currently-user/currently-user.service';
import { MerchantUser } from '../../../../../core/interfaces/merchant-user';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-menu',
  templateUrl: './admin-user-menu.component.html',
  styleUrl: './admin-user-menu.component.scss'
})
export class AdminUserMenuComponent {

  public user: MerchantUser | null = null
  constructor(
    private currentUser: CurrentlyUserService,
    private router : Router
    ){
    this.currentUser.getUser().subscribe(user => this.user = user)
  }

  public myPerfil() {
    this.router.navigate(['/perfil'])
  }

  public logout() {
    this.currentUser.logout()
    this.router.navigate([''])
  }

}
