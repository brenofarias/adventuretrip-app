import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import firebase from 'firebase';
import { InicioPage } from '../inicio/inicio';

export interface PageInterface {
  title: string;
  pageName: string;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'EstadosPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Chat', pageName: 'ChatsPage', icon:'ios-chatbubbles-outline'},
    { title: 'Grupos', pageName: 'GroupsPage', icon:'ios-people-outline'},
    { title: 'Favoritos', pageName: 'FavoritosPage', icon:'ios-heart-outline'},
    { title: 'Viagens', pageName: 'ViagensPage', icon:'ios-paper-plane-outline'},
    { title: 'Perfil', pageName: 'ProfilePage', icon:'ios-person-outline'}
  ]

  nome;
  avatar;
  email;

  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams, public userservice: UserProvider) {
    // loaduserdetails() {
      this.userservice.getuserdetails().then((res: any) => {
        this.nome = res.displayName;
        this.email = res.email;
        this.zone.run(() => {
          this.avatar = res.photoURL;
        })
      })
      console.log(this.nome);
      
    // }
  
  }

  openPage(page: PageInterface) {
    this.nav.push(page.pageName);
  }

  isActive(page: PageInterface) {

  }

  sair() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot(InicioPage);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
