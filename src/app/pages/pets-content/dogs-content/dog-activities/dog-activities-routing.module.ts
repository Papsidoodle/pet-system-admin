import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogActivitiesPage } from './dog-activities.page';

const routes: Routes = [
  {
    path: '',
    component: DogActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogActivitiesPageRoutingModule {}
