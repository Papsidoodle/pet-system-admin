import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogGroomingPageRoutingModule } from './dog-grooming-routing.module';

import { DogGroomingPage } from './dog-grooming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogGroomingPageRoutingModule
  ],
  declarations: [DogGroomingPage]
})
export class DogGroomingPageModule {}
