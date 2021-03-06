import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupmembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupmembers',
  templateUrl: 'groupmembers.html',
})
export class GroupmembersPage {
  groupmembers;
  tempgrpmembers;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public groupservice: GroupsProvider,
  public events: Events) {
  }

  ionViewWillEnter() {
    this.groupmembers = this.groupservice.currentgroup;
    this.tempgrpmembers = this.groupmembers;
    this.events.subscribe('gotintogroup', () => {
      this.groupmembers = this.groupservice.currentgroup;
      this.tempgrpmembers = this.groupmembers;

    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotintogroups');
  }

  searchuser(searchbar) {
    let tempmembers = this.tempgrpmembers;

    var q = searchbar.target.value;
    if (q.trim() === '') {
      this.groupmembers = this.tempgrpmembers;
      return;
    }

    tempmembers = tempmembers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true; 
      }
      return false;
    })
    
    this.groupmembers = tempmembers;

  }

  removemember(member) {
    let namealert = this.alertCtrl.create({
      buttons: ['Okay']
    });
    this.groupservice.deletemember(member).then(() => {
      namealert.setMessage(member.displayName + " foi deletado do grupo");
      namealert.present();
    })
  }

}
