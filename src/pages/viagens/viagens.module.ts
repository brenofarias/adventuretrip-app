import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViagensPage } from './viagens';

@NgModule({
  declarations: [
    ViagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ViagensPage),
  ],
})
export class ViagensPageModule {}
