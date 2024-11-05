import { CanActivateFn, Router } from '@angular/router';
import { CurrentlyUserService } from '../../services/currently-user/currently-user.service';
import { inject } from '@angular/core';

export const hasTokenGuard: CanActivateFn = (route, state) => {
  const currentUserService = inject(CurrentlyUserService)
  const routerService = inject(Router)
  if (currentUserService.hasLogged()) {
      return routerService.createUrlTree(['/admin'])
  }
  return true
};
