import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasTokenGuard } from '../../core/guards/has-token/has-token.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
  },
  {
      path: 'login',
      component: LoginComponent, 
      canActivate: [hasTokenGuard]

  },
  {
      path: 'register',
      component: RegisterComponent,
      canActivate: [hasTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
