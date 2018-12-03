import firebase from 'firebase';
import { Injectable } from '@angular/core';

/*
  Generated class for the PacotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacotesProvider {
  firedata = firebase.database().ref('/pacotes');
  fav = firebase.database().ref('/favoritos');
  // pacotedesc: any;
  pacote: any;
  constructor() {
   
  }

  gopacotedesc(pacote) {
    this.pacote = pacote;
    // console.log(this.pacotedesc);
    
  }

  getallpacotes() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.once('value', (snapshot) => {
        let pacotesdata = snapshot.val();
        let pacotes = [];
        for (var key in pacotesdata) {
          pacotes.push(pacotesdata[key]);
          // console.log(pacotesdata[key]);
          // console.log(temparr);
          
        }
        // console.log(temparr);
        
        resolve(pacotes);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  addfav(pacote) {
    var promise = new Promise((resolve, reject) => {
      this.fav.child(firebase.auth().currentUser.uid).push({
        descricao: pacote.descricao,
        estado: pacote.estado,
        foto: pacote.foto,
        nome: pacote.nome,
        preco: pacote.preco
      }).then(() => {
        resolve({ success: true });
      }) 
    })
    return promise;
  }

  getallfav() {
    var promise = new Promise((resolve, reject) => {
      this.fav.once('value', (snapshot) => {
        let pacotesdata = snapshot.val();
        let pacotes = [];
        for (var key in pacotesdata) {
          pacotes.push(pacotesdata[key]);
        }
        
        resolve(pacotes);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
