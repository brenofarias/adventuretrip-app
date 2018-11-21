import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
/**
 * Generated class for the PagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {
  cardNumber: string;
  cardMonth: number; 
  cardYear: number;
  cardCVV: string;
  pacote;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, public alertCtrl: AlertController) {
    this.pacote = navParams.get('pacote');
    console.log(this.pacote.foto);
    

  }

  ionViewDidLoad() {
    this.stripe.setPublishableKey('pk_test_a5Wd10bULfACYUuyP4r0PO3I');
  }

  carddetails() {
    this.navCtrl.push('CardPage');
  }

  // validateCard() {
  //   let statusalert = this.alertCtrl.create({
  //     buttons: ['Okay']
  //   });
  //   let card = {
  //     number: this.cardNumber,
  //     expMonth: this.cardMonth,
  //     expYear: this.cardYear,
  //     cvc: this.cardCVV
  //   };

  //   this.stripe.createCardToken(card)
  //     .then(token => {
  //       statusalert.setTitle('Foi'); 
  //       statusalert.setSubTitle('Pagamento feito!! ' + token);
  //       statusalert.present();
  //     })
  //     .catch(error => {
  //       statusalert.setTitle('Erro'); 
  //       statusalert.setSubTitle(error);
  //       statusalert.present();
  //     });
  // }
} 

  
