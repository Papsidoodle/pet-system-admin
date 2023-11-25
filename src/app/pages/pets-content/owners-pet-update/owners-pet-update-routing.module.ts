import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersPetUpdatePage } from './owners-pet-update.page';

const routes: Routes = [
  {
    path: '',
    component: OwnersPetUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPetUpdatePageRoutingModule {}
