import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { DescpacotesPage } from '../descpacotes/descpacotes';

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
      this.pacotes = [];
      res.map((map) => {
        // console.log(map)
        this.pacotes.push(...(<any>Object).values(map))
      });
      console.log(this.pacotes);
      // console.log('resposta mais top da cidade',res);           
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PacotesPage');
  }

  descpacotes(objPacote) {
    // this.pacoteservice.gopacotedesc(pacote);
    this.navCtrl.push(DescpacotesPage, {
      pacote: objPacote
    });
  }

}
