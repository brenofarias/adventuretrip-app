import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  // ionViewDidLeave() {
  //   this.menu.enable(true);
  // }

  login(){
    this.navCtrl.push('LoginPage');
  }
  
  cadastro(){
    this.navCtrl.push(SignupPage);
  }


}
