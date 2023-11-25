import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPetModalPageRoutingModule } from './add-pet-modal-routing.module';

import { AddPetModalPage } from './add-pet-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPetModalPageRoutingModule
  ],
  declarations: [AddPetModalPage]
})
export class AddPetModalPageModule {}
