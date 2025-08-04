import { Component, Input } from '@angular/core';
import { AdminRoute } from '../../../../../core/interfaces/admin-route';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  @Input()
  public isMobile = false;
  @Input()
  public adminRoutes: AdminRoute[] = []

}
