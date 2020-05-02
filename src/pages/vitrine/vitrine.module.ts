import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VitrinePage } from './vitrine';

@NgModule({
  declarations: [
    VitrinePage,
  ],
  imports: [
    IonicPageModule.forChild(VitrinePage),
  ],
})
export class VitrinePageModule {}
