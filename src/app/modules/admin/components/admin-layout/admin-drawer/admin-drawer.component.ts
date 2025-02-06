import { Component } from '@angular/core';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { AdminRoute } from '../../../../../core/interfaces/admin-route';
import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';
import { adminRoutes } from '../../../../../core/mocks/admin-routes';

@Component({
  selector: 'app-admin-drawer',
  templateUrl: './admin-drawer.component.html',
  styleUrl: './admin-drawer.component.scss'
})
export class AdminDrawerComponent {
  public showNav = false;
  public isMobile = false;
  public adminRoutes: AdminRoute[] = adminRoutes

  constructor(
    public windowService: WindowWidthService,
    public sideNavService: ShowAdminSideNavService,
    ) {
      this.sideNavService.currentShowNav.subscribe(showNav => this.showNav = showNav);
      this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
      
    }
}