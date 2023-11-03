import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatAddPage } from './cat-add.page';

const routes: Routes = [
  {
    path: '',
    component: CatAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatAddPageRoutingModule {}
