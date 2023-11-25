import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPetsPage } from './user-pets.page';

const routes: Routes = [
  {
    path: '',
    component: UserPetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPetsPageRoutingModule {}
