import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPetPage } from './owners-pet.page';

const routes: Routes = [
  {
    path: '',
    component: OwnersPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPetPageRoutingModule {}
