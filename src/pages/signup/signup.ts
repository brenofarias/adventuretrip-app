import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { LoginPage } from '../login/login';
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

  newuser: any = {
    email: '',
    password: '',
    displayName: '',
    cpf: '',
    nascimento: '',
    sexo: '',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, 
              public loadingCtrl: LoadingController, public toastCtrl: ToastController ) {
  }

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    // this.ano = new Date().getDate();
    // this.idade = this.ano - this.newuser.nascimento;
    // console.log("IDADE " + this.idade);
    

    if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '' || this.newuser.cpf == '' || this.newuser.nascimento == '' || this.newuser.sexo == ''){
      toaster.setMessage('Preencha todos os campos');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Senha fraca');
      toaster.present();
    }
    // else if (this.idade < 18) {
    //   toaster.setMessage('Você é menor de idade');
    //   toaster.present();
    // }
    else{
      let loader = this.loadingCtrl.create({
        content: 'Por favor espere'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push('ProfilepicPage');
        else
          alert('Error' + res);
      })
    }
  }

  goBack() {
    this.navCtrl.setRoot(InicioPage); 
  }

}
