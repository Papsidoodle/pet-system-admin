import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatFoodsPage } from './cat-foods.page';

const routes: Routes = [
  {
    path: '',
    component: CatFoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatFoodsPageRoutingModule {}
