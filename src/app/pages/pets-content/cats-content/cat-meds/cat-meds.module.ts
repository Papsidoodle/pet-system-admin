import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatMedsPageRoutingModule } from './cat-meds-routing.module';

import { CatMedsPage } from './cat-meds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatMedsPageRoutingModule
  ],
  declarations: [CatMedsPage]
})
export class CatMedsPageModule {}
