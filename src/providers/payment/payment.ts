import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  firedata = firebase.database().ref('/pagamentos');

  constructor(public afireauth: AngularFireAuth) {
  }

  dopayment(token) {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).push({
        usuario: firebase.auth().currentUser.email,
        token: token.id,
        data: token.created
      }).then(() => {
        resolve({ success: true });
      })
    })

    return promise;
  }

}
