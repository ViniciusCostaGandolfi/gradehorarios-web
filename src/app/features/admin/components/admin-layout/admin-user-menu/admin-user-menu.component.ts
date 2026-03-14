import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem,MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

import type { UserDto } from '../../../../../core/interfaces/usuario';
import { CurrentlyUserService } from '../../../../../core/services/currently-user/currently-user.service';

@Component({
    selector: 'app-admin-user-menu',
    templateUrl: './admin-user-menu.component.html',
    styleUrl: './admin-user-menu.component.scss',
    standalone: true,
    imports: [MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatButton]
})
export class AdminUserMenuComponent {

  public user: UserDto | null | undefined = null;
  private readonly currentUser = inject(CurrentlyUserService);
  private readonly router = inject(Router);

  constructor() {
    this.currentUser.getUser().subscribe(user => this.user = user?.user);
  }

  public myPerfil(): void {
    void this.router.navigate(['/perfil']);
  }

  public logout(): void {
    this.currentUser.logout();
    void this.router.navigate(['']);
  }

}
