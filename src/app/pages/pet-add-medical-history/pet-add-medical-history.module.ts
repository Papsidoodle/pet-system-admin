import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetAddMedicalHistoryPageRoutingModule } from './pet-add-medical-history-routing.module';

import { PetAddMedicalHistoryPage } from './pet-add-medical-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetAddMedicalHistoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PetAddMedicalHistoryPage]
})
export class PetAddMedicalHistoryPageModule {}
