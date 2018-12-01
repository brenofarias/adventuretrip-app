import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ModalController, Modal } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingCtrl: LoadingController,
    public groupservice: GroupsProvider, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Pegando seus grupos, aguarde...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }

  addgroup() {
    // let modal = this.modalCtrl.create('NewgroupPage');
    this.navCtrl.push('NewgroupPage');
    // modal.present();
  }

  openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push('GroupchatPage', { groupName: group.groupName });
    // modal.present();
  }

  back() {
    let modal = this.modalCtrl.create('EstadosPage');
    modal.present();
  }


}
