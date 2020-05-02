import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroDetalhePage } from './registro-detalhe';

@NgModule({
  declarations: [
    RegistroDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroDetalhePage),
  ],
})
export class RegistroDetalhePageModule {}
