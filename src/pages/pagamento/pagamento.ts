import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  pacote;
  total;
  constructor(public navCtrl: NavController, public payment: PaymentProvider, public navParams: NavParams, public stripe: Stripe, public alertCtrl: AlertController) {
    this.pacote = navParams.get('pacote');
    this.total = navParams.get('total');
    // console.log(this.pacote.foto);


  }

  ionViewDidLoad() {
    this.stripe.setPublishableKey('pk_test_a5Wd10bULfACYUuyP4r0PO3I');
  }

  carddetails() {
    this.navCtrl.push('CardPage');
  }

  pay() {
    let statusalert = this.alertCtrl.create({
      buttons: ['Okay']
    });
    this.stripe.setPublishableKey('pk_test_a5Wd10bULfACYUuyP4r0PO3I');
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      // let objString = JSON.stringify(token);
      let pagamento = 'stripetoken=' + token + '&amount=' + this.total;
      this.payment.dopayment(token).then(() => {
      })
      statusalert.setTitle('Foi');
      statusalert.setSubTitle('Pagamento feito!! ' + token);
      statusalert.present();
    }).catch(error => {
      statusalert.setTitle('Erro');
      statusalert.setSubTitle(error);
      statusalert.present();
    })
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


