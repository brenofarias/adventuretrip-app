import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
import { DatePipe } from '@angular/common';

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
  data;
  constructor(public navCtrl: NavController, public datepipe: DatePipe, public payment: PaymentProvider, public navParams: NavParams, public stripe: Stripe, public alertCtrl: AlertController) {
    this.pacote = navParams.get('pacote');
    this.total = navParams.get('total');
    this.data = navParams.get('data');
    this.data = this.datepipe.transform(this.data, 'dd/MM/yyyy');
    console.log(this.data);


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
    this.payment.presentWithGif1();
    setTimeout(() => {
      this.payment.dismiss().then(() => {
        this.stripe.createCardToken(this.cardinfo).then((token) => {
          // let objString = JSON.stringify(token);
          // let pagamento = 'stripetoken=' + token + '&amount=' + this.total;
          this.payment.dopayment(token).then(() => {
            statusalert.setTitle('Sucesso');
            statusalert.setSubTitle('Pagamento feito!! ');
            statusalert.present({});
            // this.navCtrl.setRoot('EstadosPage');

          })
        }).then(() => {
          this.payment.viagens(this.pacote, this.data).then(() => {
            statusalert.setTitle('Oba');
            statusalert.setSubTitle('Você acabou de comprar uma aventura inesquecível, indo no menu Viagens você encotrar ela');
            statusalert.present();
            this.navCtrl.push('ViagensPage');
          })
        }).catch(error => {
          statusalert.setTitle('Erro');
          statusalert.setSubTitle(error);
          statusalert.present();
          console.log(error);

        })
      }).catch(error => {
        statusalert.setTitle('Erro2');
        statusalert.setSubTitle(error);
        statusalert.present();
        console.log(error);
      })
    }, 5000);


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


