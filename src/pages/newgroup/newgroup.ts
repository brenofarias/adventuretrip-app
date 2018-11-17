import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { GroupsPage } from '../groups/groups';

/**
 * Generated class for the NewgroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {
  newgroup = {
    groupName: 'Nome do Grupo',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/chat-603cb.appspot.com/o/profileimages%2Fchatterplace.png?alt=media&token=67373b89-c88e-4a22-882d-523bebd7cf78'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public groupservice: GroupsProvider, public imghandler: ImghandlerProvider, public loadingCtrl: LoadingController) {
  }

  chooseimage() {
    if (this.newgroup.groupName == 'GroupName') {
      let namealert = this.alertCtrl.create({
        buttons: ['Okay'],
        message: 'Por favor coloque o nome do grupo primeiro'
      });
      namealert.present()
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Carregando aguarde...'
      });
      loader.present();
      this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) => {
        loader.dismiss();
        if (res)
          this.newgroup.groupPic = res;
      }).catch((err) => {
        alert(err);
      })
    }
  }

  creategroup() {
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  editgroupname() {
    let alert = this.alertCtrl.create({
      title: 'Editar Nome do Grupo',
      inputs: [{
        name: 'groupname',
        placeholder: 'De um novo nome para o grupo'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Okay',
        handler: data => {
          if (data.groupname) {
            this.newgroup.groupName = data.groupname
          }
          else {
            this.newgroup.groupName = 'groupName';
          }
        }
      }
      ]
    });
    alert.present();
  }

  back() {
    this.navCtrl.setRoot('EstadosPage');
  }

}
