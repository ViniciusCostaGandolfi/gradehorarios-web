import { Component } from '@angular/core';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';
import { AdminRoute } from '../../../../core/interfaces/admin-route';
import { CurrentlyUserService } from '../../../../core/services/currently-user/currently-user.service';
import { getRoutes } from '../../../../core/mocks/admin-routes';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  public isMobile = false;
  public adminRoutes: AdminRoute[] = []

  constructor(
    private windowService: WindowWidthService,
    private currentUserService: CurrentlyUserService

    ) {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    this.currentUserService.getUser().subscribe(tokenUsuario => {
        if (tokenUsuario) {
          this.adminRoutes = getRoutes(tokenUsuario.user)
        }
    })
  }


}
