import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetViewMedicalHistoryPageRoutingModule } from './pet-view-medical-history-routing.module';

import { PetViewMedicalHistoryPage } from './pet-view-medical-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetViewMedicalHistoryPageRoutingModule
  ],
  declarations: [PetViewMedicalHistoryPage]
})
export class PetViewMedicalHistoryPageModule {}
