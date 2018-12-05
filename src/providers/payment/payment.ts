import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class PaymentProvider {
  firedata = firebase.database().ref('/pagamentos');
  loading: Loading;
  constructor(public afireauth: AngularFireAuth, public loadingCtrl: LoadingController) {
  }

  dopayment(token) {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).push({
        usuario: firebase.auth().currentUser.email,
        token: token.id,
        data: token.created,
        tudo: token
      }).then(() => {
        resolve({ success: true });
      })
    })

    return promise;
  }

  presentWithGif1() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="loading" width="auto" height="auto" src="assets/imgs/verify1.gif"/>
      </div>`
    });

    return this.loading.present();
  }

  dismiss() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loading.dismiss(resolve(true)).catch(error => {
          console.log('loading error: ', error);
        });
      } else {
        resolve(true);
      }
    });

  }

  viagens(pacote, data) {
    let viagens = firebase.database().ref('/viagens');
    var promise = new Promise((resolve, reject) => {
      viagens.child(firebase.auth().currentUser.uid).push({
        descricao: pacote.descricao,
        estado: pacote.estado,
        foto: pacote.foto,
        nome: pacote.nome,
        preco: pacote.preco,
        incluso: pacote.incluso,
        incluso2: pacote.incluso2,
        incluso3: pacote.incluso3,
        data: data
      }).then(() => {
        resolve({ success: true });
      })
    }).catch((err) => {
      console.log(err);
    })

    return promise;
  }
}
