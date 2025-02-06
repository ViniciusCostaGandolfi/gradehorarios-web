import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminComponent } from './pages/admin.component';
import { CollegesListPageComponent } from './pages/colleges-list-page/colleges-list-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      {path: '', component: AdminComponent},
      {path: 'escolas', component: CollegesListPageComponent},
      {path: 'perfil', component: ProfilePageComponent},
      {path: 'configuracoes', component: SettingsPageComponent},

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
