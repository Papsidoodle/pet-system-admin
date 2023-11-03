import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogMainPage } from './dog-main.page';

const routes: Routes = [
  {
    path: '',
    component: DogMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogMainPageRoutingModule {}
