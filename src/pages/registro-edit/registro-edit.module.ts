import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroEditPage } from './registro-edit';

@NgModule({
  declarations: [
    RegistroEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroEditPage),
  ],
})
export class RegistroEditPageModule {}
