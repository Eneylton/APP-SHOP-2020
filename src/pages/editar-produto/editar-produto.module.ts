import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarProdutoPage } from './editar-produto';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EditarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarProdutoPage),
    BrMaskerModule
  ],
})
export class EditarProdutoPageModule {}
