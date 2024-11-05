import { Component } from '@angular/core';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MyRoutesService } from '../../../core/services/my-routes/my-routes.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoute } from '../../../core/interfaces/admin-route';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public adminRoutes: AdminRoute[] = []

  constructor(
    private myRoutesService: MyRoutesService,
  ) {
    this.myRoutesService.routes$.subscribe(routes => {
      this.adminRoutes = routes;
    });
  }

}
