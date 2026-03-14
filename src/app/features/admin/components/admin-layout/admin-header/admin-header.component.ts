import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem,MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import type { AdminRoute } from '../../../../../core/interfaces/admin-route';
import { AdminUserMenuComponent } from '../admin-user-menu/admin-user-menu.component';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrl: './admin-header.component.scss',
    standalone: true,
    imports: [MatToolbar, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, RouterLink, AdminUserMenuComponent]
})
export class AdminHeaderComponent {
  @Input()
  public isMobile = false;
  @Input()
  public adminRoutes: AdminRoute[] = []

}
