import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { MatNavList } from '@angular/material/list';
import { AdminUserMenuComponent } from '../admin-user-menu/admin-user-menu.component';
import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  constructor(
    public sideNavService: ShowAdminSideNavService,
    public windowWidth: WindowWidthService
    ) {}
  toggleSideNav() {
    this.sideNavService.toggleNav();
  }
  

}
