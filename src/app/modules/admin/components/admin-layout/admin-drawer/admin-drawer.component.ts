import { Component } from '@angular/core';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { AdminRoute } from '../../../../../core/interfaces/admin-route';
import { MyRoutesService } from '../../../../../core/services/my-routes/my-routes.service';
import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';

@Component({
  selector: 'app-admin-drawer',
  templateUrl: './admin-drawer.component.html',
  styleUrl: './admin-drawer.component.scss'
})
export class AdminDrawerComponent {
  public showNav = false;
  public isMobile = false;
  public adminRoutes: AdminRoute[] = []

  constructor(
    public windowService: WindowWidthService,
    public sideNavService: ShowAdminSideNavService,
    private myRoutesService: MyRoutesService
    ) {
      this.sideNavService.currentShowNav.subscribe(showNav => this.showNav = showNav);
      this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
      
      this.myRoutesService.routes$.subscribe(routes => {
        this.adminRoutes = routes;
      });
    }
}