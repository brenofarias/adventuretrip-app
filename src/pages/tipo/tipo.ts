import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html',
})
export class TipoPage {
  nome;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nome = navParams.get('estado');
    console.log(this.nome);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoPage');
  }

  sozinho() {
    let sozinho = "sozinho"
    this.navCtrl.push('PacotesPage', {
      estado: this.nome,
      tipo: sozinho
    });
    // console.log(this.nome);
    
  }

  excursao() {
    this.navCtrl.push('PacotesPage', {
      estado: this.nome
    });
  }

}
