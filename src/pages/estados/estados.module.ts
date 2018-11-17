import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadosPage } from './estados';

@NgModule({
  declarations: [
    EstadosPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadosPage),
  ],
})
export class EstadosPageModule {}
