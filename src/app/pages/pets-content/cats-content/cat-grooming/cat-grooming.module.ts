import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatGroomingPageRoutingModule } from './cat-grooming-routing.module';

import { CatGroomingPage } from './cat-grooming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatGroomingPageRoutingModule
  ],
  declarations: [CatGroomingPage]
})
export class CatGroomingPageModule {}
