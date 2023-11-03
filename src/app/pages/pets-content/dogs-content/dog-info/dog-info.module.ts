import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogInfoPageRoutingModule } from './dog-info-routing.module';

import { DogInfoPage } from './dog-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogInfoPageRoutingModule
  ],
  declarations: [DogInfoPage]
})
export class DogInfoPageModule {}
