import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({})
@Component({
  selector: 'page-registro-detalhe',
  templateUrl: 'registro-detalhe.html',
})
export class RegistroDetalhePage {

 
  id:        number;
  nome:      string ="";
  email:     string ="";
  tipo:      string ="";
  avatar:    string ="";
  login:     string ="";
  senha:     string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.id        = this.navParams.get('id');
    this.nome      = this.navParams.get('nome');
    this.tipo      = this.navParams.get('tipo');
    this.email     = this.navParams.get('email');
    this.avatar    = this.navParams.get('avatar');
    this.login     = this.navParams.get('login');
    this.senha     = this.navParams.get('senha');
  }

}
