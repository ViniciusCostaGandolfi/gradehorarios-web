import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentlyUserService } from '../../../../../core/services/currently-user/currently-user.service';
import { UserDto } from '../../../../../core/interfaces/usuario';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
    selector: 'app-admin-user-menu',
    templateUrl: './admin-user-menu.component.html',
    styleUrl: './admin-user-menu.component.scss',
    standalone: true,
    imports: [MatMenuTrigger, MatIcon, MatMenu, NgIf, MatMenuItem, MatButton]
})
export class AdminUserMenuComponent {

  public user: UserDto | null | undefined = null
  constructor(
    private readonly currentUser: CurrentlyUserService,
    private readonly router : Router
    ){
    this.currentUser.getUser().subscribe(user => this.user = user?.user)
  }

  public myPerfil() {
    this.router.navigate(['/perfil'])
  }

  public logout() {
    this.currentUser.logout()
    this.router.navigate([''])
  }

}
