import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatActivitiesPageRoutingModule } from './cat-activities-routing.module';

import { CatActivitiesPage } from './cat-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatActivitiesPageRoutingModule
  ],
  declarations: [CatActivitiesPage]
})
export class CatActivitiesPageModule {}
