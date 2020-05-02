import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';

@IonicPage({})
@Component({
  selector: 'page-perfil-edit',
  templateUrl: 'perfil-edit.html',
})

export class PerfilEditPage {

  log: any;
  nome: string;
  email: string;
  avatar: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nome = this.log.nome;
      this.email = this.log.email;
      this.avatar = this.log.avatar;
    

    });
  }

  selectText(event){
    event.target.Select();
  }

  salvar(){

    let body = {
      nome: this.nome, 
      email: this.email,
      avatar: this.avatar,
      id: this.log.id,
      crud: 'editar_perfil' 
    }

    this.serve.postData(body, '/Login.php').subscribe(data => {
    
      this.log.nome = this.nome;
      this.log.email = this.email;
      this.log.avatar = this.avatar;
      this.storage.set('session_storage', this.log);

      this.navCtrl.push('ContaPage');

      const toast = this.toastyCrtl.create({
        message:'Atualização Realizada !!',
        duration:3000
      });
      toast.present();
      

    });

  }

}

