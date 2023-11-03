import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatMedsPage } from './cat-meds.page';

const routes: Routes = [
  {
    path: '',
    component: CatMedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatMedsPageRoutingModule {}
