import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoute } from '../../../../../../core/interfaces/admin-route';
import { WindowWidthService } from '../../../../../../core/services/window-width/window-width.service';
import { ShowAdminSideNavService } from '../../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';


@Component({
  selector: 'app-admin-drawer-list',
  templateUrl: './admin-drawer-list.component.html',
  styleUrl: './admin-drawer-list.component.scss'
})
export class adminDrawerListComponent {
  @Input() adminRoute!: AdminRoute

  constructor(
    private windowWidth: WindowWidthService,
    private showSideBar: ShowAdminSideNavService
  ) { }

  onClick() {

    this.windowWidth.isMobile().subscribe(isMobile => {
      if (isMobile) {
        this.showSideBar.toggleNav()
      }
    })

  }

}
