import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogMainPageRoutingModule } from './dog-main-routing.module';

import { DogMainPage } from './dog-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogMainPageRoutingModule
  ],
  declarations: [DogMainPage]
})
export class DogMainPageModule {}
