import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogUpdatePage } from './dog-update.page';

const routes: Routes = [
  {
    path: '',
    component: DogUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogUpdatePageRoutingModule {}
