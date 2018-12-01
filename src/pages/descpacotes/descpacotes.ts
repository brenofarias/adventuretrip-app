import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { PagamentoPage } from '../pagamento/pagamento';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   Environment
// } from '@ionic-native/google-maps';

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

  total;
  moveon = true;

  // map: GoogleMap;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    // this.pacote = this.pacoteservice.pacote;
    // console.log(this.pacote);
    this.pacote = navParams.get('pacote');
    console.log(this.pacote);

  }

  ionViewDidLoad() {
    this.moveon = false;

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
    // console.log(this.total);
    
    this.navCtrl.push(PagamentoPage, {
      pacote: this.pacote,
      total: this.total
    });
  }

  addfav(pacote) {
    this.pacoteservice.addfav(pacote).then(() => {
      let newalert = this.alertCtrl.create({
        title: 'Favorito',
        subTitle: 'Você adicionou este pacote como favorito',
        buttons: ['OK']
      });
      newalert.present();
    })
    // console.log(pacote);
  }

}
