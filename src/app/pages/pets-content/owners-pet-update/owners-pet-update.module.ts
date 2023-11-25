import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnersPetUpdatePageRoutingModule } from './owners-pet-update-routing.module';

import { OwnersPetUpdatePage } from './owners-pet-update.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OwnersPetUpdatePageRoutingModule
  ],
  declarations: [OwnersPetUpdatePage]
})
export class OwnersPetUpdatePageModule {}
