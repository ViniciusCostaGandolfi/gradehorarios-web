import { Component, Input } from '@angular/core';
import { AdminRoute } from '../../../../../core/interfaces/admin-route';
import { AdminUserMenuComponent } from '../admin-user-menu/admin-user-menu.component';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrl: './admin-header.component.scss',
    standalone: true,
    imports: [MatToolbar, MatButton, MatMenuTrigger, MatIcon, MatMenu, NgFor, MatMenuItem, RouterLink, AdminUserMenuComponent]
})
export class AdminHeaderComponent {
  @Input()
  public isMobile = false;
  @Input()
  public adminRoutes: AdminRoute[] = []

}
