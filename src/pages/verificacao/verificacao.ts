import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
/**
 * Generated class for the VerificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verificacao',
  templateUrl: 'verificacao.html',
})
export class VerificacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificacaoPage');
  }

  verificar() {

    let loader = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    // loader.present();  
    this.userservice.verificar().then((res: any) => {
      // loader.dismiss();
    })
    this.navCtrl.setRoot('LoginPage');

  }

}
