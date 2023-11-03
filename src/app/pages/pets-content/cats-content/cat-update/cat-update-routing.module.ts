import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatUpdatePage } from './cat-update.page';

const routes: Routes = [
  {
    path: '',
    component: CatUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatUpdatePageRoutingModule {}
