import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogAddPageRoutingModule } from './dog-add-routing.module';

import { DogAddPage } from './dog-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DogAddPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DogAddPageModule {}
