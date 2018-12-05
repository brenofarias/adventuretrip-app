import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { resolve } from 'url';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/usuarios');
  constructor(public afireauth: AngularFireAuth) {
    // console.log('Hello UserProvider Provider');
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/adventuretrip-b4a91.appspot.com/o/profileimages%2Fuser.png?alt=media&token=f5986a4f-b5cc-4523-be42-df52025bf525'
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            email: newuser.email,
            displayName: newuser.displayName,
            // nascimento: newuser.nascimento,
            cpf: newuser.cpf,
            // sexo: newuser.sexo,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/adventuretrip-b4a91.appspot.com/o/profileimages%2Fuser.png?alt=media&token=f5986a4f-b5cc-4523-be42-df52025bf525'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/usuarios/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
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

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;

  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }        
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  verificar() {
    var user = firebase.auth().currentUser;
    firebase.auth().languageCode = 'br';
    var promise = new Promise((resolve, reject) => {
      user.sendEmailVerification().then(() => {
        // Email sent.
        console.log("Email enviado");
      }).catch(function (error) {
        // An error happened.
        console.log(error);
        
      });
    })
    return promise;

  }

  viagens() {
    // var user = firebase.auth().currentUser.uid;
    var viagens = firebase.database().ref('/viagens')
    var promise = new Promise((resolve, reject) => {
      viagens.once('value', (snapshot) => {
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