import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatMainPageRoutingModule } from './cat-main-routing.module';

import { CatMainPage } from './cat-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatMainPageRoutingModule
  ],
  declarations: [CatMainPage]
})
export class CatMainPageModule {}
