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
  moveon = true;
  tipo;
  // nome;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pacoteservice: PacotesProvider) {
    var nome = navParams.get('estado');
    this.tipo = navParams.get('tipo');
    console.log(nome);
    if (this.tipo == "sozinho") {
      this.moveon = true;
      this.pacoteservice.getallpacotes().then((res: any) => {
        this.pacotes = [];
        
        res.map((map) => {
          // console.log(map)
          this.pacotes.push(...(<any>Object).values(map))
          this.filtro =  this.pacotes.filter(function(p) {
            return p.estado === nome && p.tipo == "Separado";
          });
        });
        // console.log(this.pacotes);
        // console.log(this.filtro);
        // console.log('resposta mais top da cidade',res);           
      })
    }else {
      this.moveon = false;
      this.pacoteservice.getallpacotes().then((res: any) => {
        this.pacotes = [];
        
        res.map((map) => {
          // console.log(map)
          this.pacotes.push(...(<any>Object).values(map))
          this.filtro =  this.pacotes.filter(function(p) {
            return p.estado === nome && p.tipo == "Excursão";
          });
        });
        // console.log(this.pacotes);
        // console.log(this.filtro);
        // console.log('resposta mais top da cidade',res);           
      })
    }

  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad PacotesPage');
  }

  descpacotes(objPacote) {
    // this.pacoteservice.gopacotedesc(pacote);
    this.navCtrl.push(DescpacotesPage, {
      pacote: objPacote,
      tipo: this.tipo
    });
  }

}
