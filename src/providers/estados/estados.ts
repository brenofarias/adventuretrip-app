import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the EstadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstadosProvider {
  firedata = firebase.database().ref('/estados');
  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello EstadosProvider Provider');
  }

  getallestados() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let estadosdata = snapshot.val();
        let temparr = [];
        for (var key in estadosdata) {
          temparr.push(estadosdata[key]);
        }
        console.log(firebase.auth().currentUser.uid);
        
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
