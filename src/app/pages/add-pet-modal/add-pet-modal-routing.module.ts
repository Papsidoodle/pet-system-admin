import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPetModalPage } from './add-pet-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddPetModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPetModalPageRoutingModule {}
