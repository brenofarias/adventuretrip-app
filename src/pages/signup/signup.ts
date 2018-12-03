import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { InicioPage } from '../inicio/inicio';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  ano: number;
  idade: number;
  isTextFieldType: boolean;

  newuser: any = {
    email: '',
    password: '',
    displayName: '',
    cpf: '',
    confirma: ''
    // nascimento: '',
    // sexo: '',
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public menu: MenuController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  // ionViewDidLeave() {
  //   this.menu.enable(true);
  // }

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    let cpf = this.newuser.cpf.replace(/[^\d]+/g,'');
    // console.log(cpf);

    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '' || this.newuser.cpf == '') {
      toaster.setMessage('Preencha todos os campos');
      toaster.present();
      return false;
    }

    if (this.newuser.confirma != this.newuser.password) {
      toaster.setMessage('As senhas estão diferentes');
      toaster.present();
      return false;
    }

    if (this.newuser.password.length < 7) {
      toaster.setMessage('Senha fraca');
      toaster.present();
      return false;
    }

    if (cpf == null) {
      toaster.setMessage('CPF inválido');
      toaster.present();
      return false;
    }

    if (cpf.length != 11) {
      toaster.setMessage('CPF inválido');
      toaster.present();
      return false;
    }

    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      toaster.setMessage('CPF inválido');
      toaster.present();
      return false;
    }

    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        toaster.setMessage('CPF inválido');
        toaster.present();
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;

    if (digito1 > 9) {
      digito1 = 0;
    }

    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;

    if (digito2 > 9) {
      digito2 = 0;
    }

    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      toaster.setMessage('CPF inválido');
      toaster.present();
      return false;
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Por favor espere'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.setRoot('VerificacaoPage');
        else
          console.log('Erro ' + res);
      })
    }
  }

  goBack() {
    this.navCtrl.setRoot(InicioPage);
  }

}
