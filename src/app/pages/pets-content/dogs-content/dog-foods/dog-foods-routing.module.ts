import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogFoodsPage } from './dog-foods.page';

const routes: Routes = [
  {
    path: '',
    component: DogFoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogFoodsPageRoutingModule {}
