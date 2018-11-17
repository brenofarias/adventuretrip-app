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
  pacotes: any;
  constructor() {
   
  }

  initializebuddy(pacotes) {
    this.pacotes = pacotes;
  }

  getallpacotes() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.once('value', (snapshot) => {
        let pacotesdata = snapshot.val();
        let pacotes = [];
        for (var key in pacotesdata) {
          pacotes.push(pacotesdata[key]);
          // console.log(key);
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


}
