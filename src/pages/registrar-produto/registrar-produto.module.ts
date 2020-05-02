import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarProdutoPage } from './registrar-produto';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RegistrarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrarProdutoPage),
    BrMaskerModule 
  ],
})
export class RegistrarProdutoPageModule {}
