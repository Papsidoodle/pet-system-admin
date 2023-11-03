import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomescreenPageRoutingModule } from './homescreen-routing.module';

import { HomescreenPage } from './homescreen.page';

import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(){
  return player
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomescreenPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory})
  ],
  declarations: [HomescreenPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomescreenPageModule {}
