import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoPage } from './tipo';

@NgModule({
  declarations: [
    TipoPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoPage),
  ],
})
export class TipoPageModule {}
