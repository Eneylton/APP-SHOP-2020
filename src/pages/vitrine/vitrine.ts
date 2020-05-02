import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-vitrine',
  templateUrl: 'vitrine.html',
})
export class VitrinePage {

  loja_id:any;
  limit: number = 10;
  start: number = 0;

  url:string;

  produtos: any = [];
  todos: Array<{id:any, nome: string, descricao: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.basepath;
    }

    ionViewDidLoad() {
      this.produtos = [];
      this.start = 0;
      this.listarProdutos();
    }

    
doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}
 
loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

openItem(id){

  this.navCtrl.push('PedidoPage', {id:id});

}

listarProdutos(){

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      loja_id:this.loja_id,
      crud: 'listar'
    };
    this.serve.postData(body, '/Vitrine.php').subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {

          this.produtos.push({
          id: data.result[i]["id"],
          nome: data.result[i]["nome"],
          website: data.result[i]["website"],
          quantidade: data.result[i]["quantidade"],
          money: data.result[i]["money"],
          descricao: data.result[i]["descricao"],
          loja_id: data.result[i]["loja_id"],
          foto: data.result[i]["foto"]
        });

      }

      resolve(true);

      this.todos = this.produtos;

    });
  });
}

getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((produto) => {
      return (produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (produto.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.produtos = this.todos;
  }
}

}

