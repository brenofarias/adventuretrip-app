import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { InicioPage } from '../inicio/inicio';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
    public zone: NgZone, public alertCtrl: AlertController, public imghandler: ImghandlerProvider) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['Okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Atualizado');
          statusalert.setSubTitle('Sua foto de perfil foi alterado com sucesso!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Erro');
        statusalert.setSubTitle('Sua foto de perfil não foi alterado!!');
        statusalert.present();
      })
    })
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['Okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Editar Nome',
      inputs: [{
        name: 'nickname',
        placeholder: 'Digite um nome'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {

        }
      },
      {
        text: 'Editar',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Atualizado');
                statusalert.setSubTitle('Seu nome foi alterado com sucesso!!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              }
              else {
                statusalert.setTitle('Erro');
                statusalert.setSubTitle('Seu nome não pode ser alterado!!');
                statusalert.present();
              }
            })
          }
        }
      }
      ]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot(InicioPage);
    })
  }

  delete() {
    var user = firebase.auth().currentUser;
    const confirm = this.alertCtrl.create({
      title: 'Deletar Conta',
      message: 'Você realmente quer deletar sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceitar',
          handler: () => {
            console.log('Agree clicked');
            user.delete().then(() => {
              this.navCtrl.setRoot(InicioPage)
            })
          }
        }
      ]
    });
    confirm.present();
// .catch(function (error) {
      // An error happened.
      // console.log(error);
    // });
  }
}
