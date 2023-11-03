import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogAddPage } from './dog-add.page';

const routes: Routes = [
  {
    path: '',
    component: DogAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogAddPageRoutingModule {}
