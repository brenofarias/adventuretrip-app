import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

@IonicPage()
@Component({
  selector: 'page-viagens',
  templateUrl: 'viagens.html',
})
export class ViagensPage {
  viagens;
  now:any = new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public userprovider: UserProvider) {
    this.userprovider.viagens().then((res: any) => {
      this.viagens = [];
      res.map((map) => {
        // console.log(map)
        this.viagens.push(...(<any>Object).values(map))

      });
    })
    
    this.now = this.now.getMonth()+1;
    console.log(this.now);
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViagensPage');
  }
}

