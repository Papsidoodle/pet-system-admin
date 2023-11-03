import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatActivitiesPage } from './cat-activities.page';

const routes: Routes = [
  {
    path: '',
    component: CatActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatActivitiesPageRoutingModule {}
