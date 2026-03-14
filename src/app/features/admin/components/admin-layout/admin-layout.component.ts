import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { AdminRoute } from '../../../../core/interfaces/admin-route';
import { getRoutes } from '../../../../core/mocks/admin-routes';
import { CurrentlyUserService } from '../../../../core/services/currently-user/currently-user.service';
import { WindowWidthService } from '../../../../core/services/window-width/window-width.service';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';


@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss',
    standalone: true,
    imports: [AdminHeaderComponent, RouterOutlet, FooterComponent]
})
export class AdminLayoutComponent {

  public isMobile = false;
  public adminRoutes: AdminRoute[] = []

  private windowService = inject(WindowWidthService);
  private currentUserService = inject(CurrentlyUserService);

  constructor() {
    this.windowService.isMobile().subscribe(isMobile => this.isMobile = isMobile);
    this.currentUserService.getUser().subscribe(tokenUsuario => {
        if (tokenUsuario) {
          this.adminRoutes = getRoutes(tokenUsuario.user)
        }
    })
  }


}
