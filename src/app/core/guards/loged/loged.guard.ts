import { inject } from '@angular/core';
import type { CanActivateFn} from '@angular/router';
import { Router } from '@angular/router';

import { CurrentlyUserService } from '../../services/currently-user/currently-user.service';

export const logedGuard: CanActivateFn = (_route, _state) => {
  
  const currentUserService = inject(CurrentlyUserService)
  const routerService = inject(Router)
  if (!currentUserService.hasLogged()) {
      return routerService.createUrlTree(['/login'])
  }
  return true
};
