import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogGroomingPage } from './dog-grooming.page';

const routes: Routes = [
  {
    path: '',
    component: DogGroomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogGroomingPageRoutingModule {}
