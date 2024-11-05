import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrpTestComponent } from './pages/vrp-test/vrp-test.component';

const routes: Routes = [
  {path: '', component: VrpTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VrpTestRoutingModule { }
