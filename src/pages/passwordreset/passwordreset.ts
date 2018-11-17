import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['OK']
    });
    this.userservice.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email enviado');
        alert.setSubTitle('Porfavor siga as intruções no email para recuperar sua senha');
      }
    }).catch((err) => {
      alert.setTitle('Erro');
      alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.setRoot(LoginPage);
  }

}
