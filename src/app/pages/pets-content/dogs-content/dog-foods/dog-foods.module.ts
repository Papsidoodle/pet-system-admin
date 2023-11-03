import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogFoodsPageRoutingModule } from './dog-foods-routing.module';

import { DogFoodsPage } from './dog-foods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogFoodsPageRoutingModule
  ],
  declarations: [DogFoodsPage]
})
export class DogFoodsPageModule {}
