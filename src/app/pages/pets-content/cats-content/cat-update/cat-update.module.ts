import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatUpdatePageRoutingModule } from './cat-update-routing.module';

import { CatUpdatePage } from './cat-update.page';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory(){
  return player
}
@NgModule({
  imports: [
    LottieModule.forRoot({player:playerFactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    CatUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CatUpdatePage]
})
export class CatUpdatePageModule {}
