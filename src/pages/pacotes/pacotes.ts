import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';

/**
 * Generated class for the PacotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pacotes',
  templateUrl: 'pacotes.html',
})
export class PacotesPage {
  pacotes;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    this.pacoteservice.getallpacotes().then((res: any) => {
      this.pacotes = (<any>Object).values(res);
      console.log(this.pacotes);           
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacotesPage');
  }

}
