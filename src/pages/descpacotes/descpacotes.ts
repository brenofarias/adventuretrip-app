import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { PagamentoPage } from '../pagamento/pagamento';
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-descpacotes',
  templateUrl: 'descpacotes.html',
})
export class DescpacotesPage {
  pacote;
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

  data;
  total;
  moveon = true;
  a = true;
  tipo;
  pessoas = [];
  comprador;

  p;
  d;

  constructor(public navCtrl: NavController, public viagem: PaymentProvider, public alertCtrl: AlertController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    // this.pacote = this.pacoteservice.pacote;
    this.pacote = navParams.get('pacote');
    this.p = this.pacote.preco;
    this.d = this.pacote.desconto;
    console.log(this.p, this.d);
    this.tipo = navParams.get('tipo');
    if (this.tipo == "sozinho") {
      this.moveon = true
    } else {
      this.moveon = false
      this.comprador = [];
      this.viagem.comprador().then((res: any) => {
        res.map((map) => {
          // console.log(map)
          this.comprador.push(...(<any>Object).values(map))
        });
      })
    }

  }

  ionViewDidLoad() {
    this.a = false;

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
    console.log(this.total);

    this.navCtrl.push(PagamentoPage, {
      pacote: this.pacote,
      total: this.total,
      data: this.data
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
