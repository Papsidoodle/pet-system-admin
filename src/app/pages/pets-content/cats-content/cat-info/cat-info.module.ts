import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatInfoPageRoutingModule } from './cat-info-routing.module';

import { CatInfoPage } from './cat-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatInfoPageRoutingModule
  ],
  declarations: [CatInfoPage]
})
export class CatInfoPageModule {}
