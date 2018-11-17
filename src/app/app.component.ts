import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase/app';
import 'firebase/auth';
import { InicioPage } from '../pages/inicio/inicio';
import { EstadosPage } from '../pages/estados/estados';
import { ChatsPage } from '../pages/chats/chats';
import { GroupsPage } from '../pages/groups/groups';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = InicioPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyA6DmpTC4cDvFlFsNKgxkD9-8bWhC7Rc7Q",
      authDomain: "adventuretrip-88f36.firebaseapp.com",
      databaseURL: "https://adventuretrip-88f36.firebaseio.com",
      projectId: "adventuretrip-88f36",
      storageBucket: "adventuretrip-88f36.appspot.com",
      messagingSenderId: "242131512604"
    })

    this.pages = [
      { title: 'Chat', component: ChatsPage },
      { title: 'Grupos', component: GroupsPage },
      { title: 'Perfil', component: ProfilePage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  
}
