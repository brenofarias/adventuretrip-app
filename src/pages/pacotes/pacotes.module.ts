import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacotesPage } from './pacotes';

@NgModule({
  declarations: [
    PacotesPage,
  ],
  imports: [
    IonicPageModule.forChild(PacotesPage),
  ],
})
export class PacotesPageModule {}
