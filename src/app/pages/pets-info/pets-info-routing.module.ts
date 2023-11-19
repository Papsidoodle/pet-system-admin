import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsInfoPage } from './pets-info.page';

const routes: Routes = [
  {
    path: '',
    component: PetsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsInfoPageRoutingModule {}
