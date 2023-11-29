import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetViewMedicalHistoryPage } from './pet-view-medical-history.page';

const routes: Routes = [
  {
    path: '',
    component: PetViewMedicalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetViewMedicalHistoryPageRoutingModule {}
