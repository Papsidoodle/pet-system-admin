import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatAddPageRoutingModule } from './cat-add-routing.module';

import { CatAddPage } from './cat-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CatAddPage]
})
export class CatAddPageModule {}
