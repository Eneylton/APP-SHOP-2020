import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarLojaPage } from './registrar-loja';

@NgModule({
  declarations: [
    RegistrarLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarLojaPage),
  ],
})
export class RegistrarLojaPageModule {}
