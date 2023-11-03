import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogMedsPageRoutingModule } from './dog-meds-routing.module';

import { DogMedsPage } from './dog-meds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogMedsPageRoutingModule
  ],
  declarations: [DogMedsPage]
})
export class DogMedsPageModule {}
