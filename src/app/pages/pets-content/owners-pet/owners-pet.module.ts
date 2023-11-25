import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPetPageRoutingModule } from './owners-pet-routing.module';

import { OwnersPetPage } from './owners-pet.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPetPageRoutingModule
  ],
  declarations: [OwnersPetPage]
})
export class OwnersPetPageModule {}
