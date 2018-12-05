import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import firebase from 'firebase';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';

@Injectable()
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: usercreds) {
    var promise = new  Promise((resolve, reject) => { 
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      }).then(() => {
        var user = firebase.auth().currentUser;
        var verificado = user.emailVerified;
        if (verificado) {
          resolve(true);
        } 
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    })

    return promise;
  }

}
