import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatInfoPage } from './cat-info.page';

const routes: Routes = [
  {
    path: '',
    component: CatInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatInfoPageRoutingModule {}
