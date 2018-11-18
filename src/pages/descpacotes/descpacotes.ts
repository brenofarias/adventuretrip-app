import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';

/**
 * Generated class for the DescpacotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-descpacotes',
  templateUrl: 'descpacotes.html',
})
export class DescpacotesPage {
  pacote = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    // this.pacote = this.pacoteservice.pacote;
    // console.log(this.pacote);
    this.pacote = navParams.get('pacote');
    console.log(this.pacote);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescpacotesPage');
  }

}
