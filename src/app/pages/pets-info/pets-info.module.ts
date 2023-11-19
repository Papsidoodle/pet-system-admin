import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsInfoPageRoutingModule } from './pets-info-routing.module';

import { PetsInfoPage } from './pets-info.page';

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
    PetsInfoPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory})
  ],
  declarations: [PetsInfoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetsInfoPageModule {}
