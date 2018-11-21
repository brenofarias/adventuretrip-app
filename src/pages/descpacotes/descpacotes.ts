import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { PagamentoPage } from '../pagamento/pagamento';

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
  // trip info
  trip: any;
  // number of adult
  adults = 2;
  // number of children
  children = 0;

  pagamento: any = {
    adultos: '',
    criancas: '',
    preco: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    // this.pacote = this.pacoteservice.pacote;
    // console.log(this.pacote);
    this.pacote = navParams.get('pacote');
    console.log(this.pacote);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescpacotesPage');
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.navCtrl.push(PagamentoPage, {
      pacote: this.pacote
    });
  }

}
