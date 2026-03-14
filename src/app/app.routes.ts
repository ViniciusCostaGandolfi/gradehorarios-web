import type { Routes } from '@angular/router';

import { logedGuard } from './core/guards/loged/loged.guard';
import { ADMIN_ROUTES } from './features/admin/admin-routing';
import { HOME_ROUTES } from './features/home/home-routing';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        children: HOME_ROUTES
    },
    {
        path: 'admin',
        children: ADMIN_ROUTES,
        canActivate: [logedGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];