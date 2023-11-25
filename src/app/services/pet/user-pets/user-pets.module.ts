import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPetsPageRoutingModule } from './user-pets-routing.module';

import { UserPetsPage } from './user-pets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPetsPageRoutingModule
  ],
  declarations: [UserPetsPage]
})
export class UserPetsPageModule {}
