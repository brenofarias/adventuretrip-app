import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacotesProvider } from '../../providers/pacotes/pacotes';
import { DescpacotesPage } from '../descpacotes/descpacotes';

@IonicPage()
@Component({
  selector: 'page-pacotes',
  templateUrl: 'pacotes.html',
})
export class PacotesPage {
  pacotes;
  modified;
  filtro;
  // nome;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    var nome = navParams.get('estado');
    console.log(nome);
    
    this.pacoteservice.getallpacotes().then((res: any) => {
      this.pacotes = [];
      
      res.map((map) => {
        // console.log(map)

        this.pacotes.push(...(<any>Object).values(map))
        this.filtro =  this.pacotes.filter(function(p) {
          return p.estado === nome;
        });
      });
      // console.log(this.pacotes);

      // console.log(this.filtro);
      
      // console.log('resposta mais top da cidade',res);           
    })
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad PacotesPage');
  }

  descpacotes(objPacote) {
    // this.pacoteservice.gopacotedesc(pacote);
    this.navCtrl.push(DescpacotesPage, {
      pacote: objPacote
    });
  }

}
