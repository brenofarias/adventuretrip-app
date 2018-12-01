import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import 'firebase/auth';
import { InicioPage } from '../pages/inicio/inicio';
// import { EstadosPage } from '../pages/estados/estados';
// import { AppProvider } from '../providers/app/app'
// import { ChatsPage } from '../pages/chats/chats';
// import { GroupsPage } from '../pages/groups/groups';
// import { ProfilePage } from '../pages/profile/profile';
// import { timer } from 'rxjs/observable/timer';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = InicioPage;
  
  // pages: Array<{title: string, component: any, icon: string}>;
  avatar;
  nome;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public zone: NgZone) {
    firebase.initializeApp({
      apiKey: "AIzaSyBgE7b0psib4yyEFT5ApzBkZeaLTtD3ldo",
      authDomain: "adventuretrip-b4a91.firebaseapp.com",
      databaseURL: "https://adventuretrip-b4a91.firebaseio.com",
      projectId: "adventuretrip-b4a91",
      storageBucket: "adventuretrip-b4a91.appspot.com",
      messagingSenderId: "234884577159"
    })


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  }
  


}
