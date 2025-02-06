import { Component } from '@angular/core';
import { WindowWidthService } from '../../../../../core/services/window-width/window-width.service';
import { ShowAdminSideNavService } from '../../../../../core/services/show-admin-side-nav/show-admin-side-nav.service';
import { AdminRoute } from '../../../../../core/interfaces/admin-route';
import { adminRoutes } from '../../../../../core/mocks/admin-routes';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  public adminRoutes: AdminRoute[] = adminRoutes


  constructor(
    public windowWidth: WindowWidthService
    ) {}

  

}
