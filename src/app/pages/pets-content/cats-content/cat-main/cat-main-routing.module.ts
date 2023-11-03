import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatMainPage } from './cat-main.page';

const routes: Routes = [
  {
    path: '',
    component: CatMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatMainPageRoutingModule {}
