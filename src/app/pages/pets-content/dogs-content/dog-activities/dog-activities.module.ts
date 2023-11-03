import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogActivitiesPageRoutingModule } from './dog-activities-routing.module';

import { DogActivitiesPage } from './dog-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogActivitiesPageRoutingModule
  ],
  declarations: [DogActivitiesPage]
})
export class DogActivitiesPageModule {}
