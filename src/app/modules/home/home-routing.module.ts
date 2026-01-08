import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasTokenGuard } from '../../core/guards/has-token/has-token.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
  },
  {
      path: 'entrar',
      component: LoginComponent, 
      canActivate: [hasTokenGuard]

  },
  {
      path: 'registrar',
      component: RegisterComponent,
      canActivate: [hasTokenGuard]
  },

  {
    path: 'recuperar-password/:resetPasswordToken',
    component: ResetPasswordPageComponent,
    canActivate: [hasTokenGuard]
  },

  {
    path: 'resetar-password',
    component: ForgotPasswordPageComponent,
    canActivate: [hasTokenGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
