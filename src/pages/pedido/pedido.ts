import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  pedidos: any = [];

  url: string ="";
   
  id:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider) {
      this.url = this.serve.basepath;
  }

  ionViewDidLoad() {
   this.id =  this.navParams.get("id");
   
   
   this.pedidos = [];
   this.listarPedidos();

  }

  listarPedidos() {
    let body = {

      id:this.id,
      crud: 'listar_pedidos'

    };

    this.serve.postData(body, '/Vitrine.php').subscribe(data => {
      for (let pedido of data.result) {
        this.pedidos.push(pedido);
        console.log(this.pedidos);
      }
    });
  }

}
