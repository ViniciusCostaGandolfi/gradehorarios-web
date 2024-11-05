import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentlyUserService } from '../currently-user/currently-user.service';
import { MerchantUser, ModulePermission } from '../../interfaces/merchant-user';
import { allRoutes } from '../../mocks/admin-routes';

@Injectable({
  providedIn: 'root'
})
export class MyRoutesService {
  private routesSubject = new BehaviorSubject<any[]>([]);
  public routes$: Observable<any[]> = this.routesSubject.asObservable();

  constructor(private currentUserService: CurrentlyUserService) {
    this.currentUserService.getUser().subscribe((user: MerchantUser | null) => {
      if (user && user.permissions) {
        const filteredRoutes = this.filterRoutesByPermissions(user.permissions);
        this.routesSubject.next(filteredRoutes);
      }
    });
  }

  private filterRoutesByPermissions(permissions: string[]): any[] {
    const orderedCategories = [
      ModulePermission.CATALOG,
      ModulePermission.ORDER,
      ModulePermission.COMMAND,
      ModulePermission.LOGISTIC,
      ModulePermission.INTEGRATION,
      ModulePermission.MERCHANT
  ];

  const orderedPermissions = orderedCategories.filter(category => permissions.includes(category));

  let orderedRoutes = orderedPermissions
      .map(category => allRoutes[category])
      .flat();

  return orderedRoutes;
  }
}
