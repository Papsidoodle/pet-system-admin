import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatFoodsPageRoutingModule } from './cat-foods-routing.module';

import { CatFoodsPage } from './cat-foods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatFoodsPageRoutingModule
  ],
  declarations: [CatFoodsPage]
})
export class CatFoodsPageModule {}
