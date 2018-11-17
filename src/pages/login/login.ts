import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';
import { InicioPage } from '../inicio/inicio';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: any  = {
    email: '',
    senha: ''
  }

  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if (this.credentials.email == '' || this.credentials.password == '') {
      toaster.setMessage('Preencha todos os campos');
      toaster.present();
    }else {
      this.authservice.login(this.credentials).then((res: any) => {
        if (!res.code)
          this.navCtrl.setRoot('EstadosPage');
        else
          alert(res)
      })
    }

  }

  signup() {
    this.navCtrl.push(InicioPage);
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

}
