import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatGroomingPage } from './cat-grooming.page';

const routes: Routes = [
  {
    path: '',
    component: CatGroomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatGroomingPageRoutingModule {}
