import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { InstituicoesPageComponent } from './pages/instituicoes-page/instituicoes-page.component';
import { InstituicaoPageComponent } from './pages/instituicao-page/instituicao-page.component';
import { NovaSolucaoPageComponent } from './pages/nova-solucao-page/nova-solucao-page.component';
import { SolucaoPageComponent } from './pages/solucao-page/solucao-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', component: AdminComponent},
      {path: 'instituicoes', component: InstituicoesPageComponent},
      {path: 'instituicoes/:instituicaoId', component: InstituicaoPageComponent},
      {path: 'instituicoes/:instituicaoId/solucoes/nova', component: NovaSolucaoPageComponent},
      {path: 'instituicoes/:instituicaoId/solucoes/:solucaoId', component: SolucaoPageComponent},
      {path: 'usuarios', component: AdminComponent},
      {path: 'perfil', component: AdminComponent},
      {path: 'configuracoes', component: AdminComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
