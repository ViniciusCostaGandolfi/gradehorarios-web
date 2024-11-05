import { Routes } from '@angular/router';
import { logedGuard } from './core/guards/loged/loged.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    
    {
        path: 'routing',
        loadChildren: () => import('./modules/vrp-test/vrp-test.module').then(m => m.VrpTestModule),

    },
    {
        path: 'test',
        redirectTo: 'routing'
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [logedGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

