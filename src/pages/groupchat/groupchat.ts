import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ViewController, Content, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

/**
 * Generated class for the GroupchatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
  @ViewChild('content') content: Content;
  owner: boolean = false;
  groupName;
  newmessage;
  allgroupmsgs;
  alignuid;
  photoURL;
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsProvider,
    public actionSheet: ActionSheetController, public viewCtrl: ViewController, public events: Events, public imgstore: ImghandlerProvider, public loadingCtrl: LoadingController) {
      this.alignuid = firebase.auth().currentUser.uid;
      this.photoURL = firebase.auth().currentUser.photoURL;
      this.groupName = this.navParams.get('groupName');
      this.groupservice.getownership(this.groupName).then((res) => {
        if (res)
          this.owner = true;  
      }).catch((err) => {
        alert(err);
        })
      this.groupservice.getgroupmsgs(this.groupName);
      this.events.subscribe('newgroupmsg', () => {
        this.allgroupmsgs = [];
        this.imgornot = [];
        this.allgroupmsgs = this.groupservice.groupmsgs;
        for (var key in this.allgroupmsgs) {
          var d = new Date(this.allgroupmsgs[key].timestamp);
          var hours = d.getHours();
          var minutes = "0" + d.getMinutes();
          var month = d.getMonth();
          var da = d.getDate();
   
          var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
          
          var formattedTime = da + " - " + monthNames[month] + " - " + hours + ":" + minutes.substr(-2);
   
          this.allgroupmsgs[key].timestamp = formattedTime;
          if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
            this.imgornot.push(true);
          }
          else {
            this.imgornot.push(false);
          }
        }
        this.scrollto();
      })
   
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }

  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Ações do Grupo',
      buttons: [
        {
          text: 'Adicionar membro',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push('GroupbuddiesPage');
          }
        },
        {
          text: 'Compartilhar Pacote',
          icon: 'share-alt',
          handler: () => {
            // this.navCtrl.push('GroupbuddiesPage');
            // console.log(pacote);
            
          }
        },
        {
          text: 'Remover Membro',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupmembersPage');
          }
        },
        {
          text: 'Informações do Grupo',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', { groupName: this.groupName });
          }
        },
        {
          text: 'Apagar grupo',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Ações do Grupo',
      buttons: [
        {
          text: 'Sair do Grupo',
          icon: 'log-out',
          handler: () => {
            this.groupservice.leavegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            });
          }
        },
        {
          text: 'Informações do Grupo',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', { groupName: this.groupName });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  addgroupmsg() {
    this.groupservice.addgroupmsg(this.newmessage).then(() => {
      this.scrollto();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  sendpicmsg() {
    let loader = this.loadingCtrl.create({
      content: 'Por favor espere'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.groupservice.addgroupmsg(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

  back() {
    this.viewCtrl.dismiss();
  }

}