import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadosProvider } from '../../providers/estados/estados';
import { PacotesProvider } from '../../providers/pacotes/pacotes';

/**
 * Generated class for the EstadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estados',
  templateUrl: 'estados.html',
})
export class EstadosPage {
  temparr = [];
  filteredestados = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public estadoservice: EstadosProvider,
    public pacoteservice: PacotesProvider) {
    this.estadoservice.getallestados().then((res: any) => {
      this.filteredestados = res;
      this.temparr = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadosPage');
  }

  pacotes() {
    // this.pacoteservice.initializebuddy(pacotes);
    this.navCtrl.push('PacotesPage');
  }

  tabsPage() {
    this.navCtrl.setRoot('TabsPage');
  }

  perfil() {
    this.navCtrl.setRoot('ProfilePage');
  }

}
