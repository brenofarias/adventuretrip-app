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
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import { Stripe } from '@ionic-native/stripe';
import { SignupPage } from '../pages/signup/signup';
import { EstadosProvider } from '../providers/estados/estados';
import { PacotesProvider } from '../providers/pacotes/pacotes';
import { DescpacotesPage } from '../pages/descpacotes/descpacotes';
import { PaymentProvider } from '../providers/payment/payment';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { AppProvider } from '../providers/app/app';
import { InicioPage } from '../pages/inicio/inicio';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    SignupPage, 
    PagamentoPage,
    DescpacotesPage,
    InicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config),
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    SignupPage,
    PagamentoPage,
    DescpacotesPage,
    InicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    AngularFireAuth,
    File,
    Stripe,
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
    PacotesProvider,
    PaymentProvider,
    AppProvider,
    DatePipe
  ]
})
export class AppModule {}
