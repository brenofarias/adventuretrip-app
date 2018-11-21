import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { resolve } from 'url';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {
  firedata = firebase.database().ref('/usuarios');

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello AppProvider Provider');
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;

  }

}
