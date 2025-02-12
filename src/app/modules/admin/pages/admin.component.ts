import { Component } from '@angular/core';
import { AdminRoute } from '../../../core/interfaces/admin-route';
import { adminRoutes } from '../../../core/mocks/admin-routes';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public adminRoutes: AdminRoute[] = adminRoutes



}
