import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  // pagamento;
  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, public payment: PaymentProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

  pay() {
    let statusalert = this.alertCtrl.create({
      buttons: ['Okay']
    });
    this.stripe.setPublishableKey('pk_test_a5Wd10bULfACYUuyP4r0PO3I');
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      // let objString = JSON.stringify(token);
      // let pagamento = 'stripetoken=' + token + '&amount=50';
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
}
