import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { DescpacotesPage } from '../descpacotes/descpacotes';


/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  pacotes;
  constructor(public navCtrl: NavController, public actionSheet: ActionSheetController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    this.pacoteservice.getallfav().then((res: any) => {
      this.pacotes = [];
      res.map((map) => {
        // console.log(map)
        this.pacotes.push(...(<any>Object).values(map))
      });
      console.log(this.pacotes);
      // console.log('resposta mais top da cidade',res);           
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }

  compartilhar(pacote) {
    let sheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Comprar Pacote',
          icon: 'card',
          handler: () => {
            this.navCtrl.push(DescpacotesPage, {
              pacote: pacote
            });
            console.log(pacote);
            
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

}
