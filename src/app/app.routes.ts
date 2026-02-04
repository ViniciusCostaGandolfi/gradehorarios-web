import { Routes } from '@angular/router';
import { logedGuard } from './core/guards/loged/loged.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HOME_ROUTES } from './features/home/home-routing';
import { ADMIN_ROUTES } from './features/admin/admin-routing';

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