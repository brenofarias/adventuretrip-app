import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { config } from './app.firebaseconfig';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { LoginPage } from '../pages/login/login';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import { InicioPage } from '../pages/inicio/inicio';
import { SignupPage } from '../pages/signup/signup';
import { ChatsPage } from '../pages/chats/chats';
import { GroupsPage } from '../pages/groups/groups';
import { ProfilePage } from '../pages/profile/profile';
import { EstadosProvider } from '../providers/estados/estados';
import { PacotesProvider } from '../providers/pacotes/pacotes';
import { DescpacotesPage } from '../pages/descpacotes/descpacotes';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    InicioPage,
    SignupPage, 
    ChatsPage,
    GroupsPage,
    ProfilePage,
    DescpacotesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    LoginPage,
    InicioPage,
    SignupPage,
    ChatsPage,
    GroupsPage,
    ProfilePage,
    DescpacotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    AngularFireAuth,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ImghandlerProvider,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    GroupsProvider,
    EstadosProvider,
    PacotesProvider
  ]
})
export class AppModule {}
