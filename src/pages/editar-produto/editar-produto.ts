import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage({})
@Component({
  selector: 'page-editar-produto',
  templateUrl: 'editar-produto.html',
})
export class EditarProdutoPage {

  id:any;
  nome:string = "";
  website:string = "";
  money:string = "";
  quantidade:string = "";
  descricao:string = "";
  foto:string = "";

  url:string =  "";
  base64Image: string = "";
  cameraData: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastyCrtl: ToastController,
    private serve: ServiceProvider,
    public alertCtrl: AlertController,
    private camera: Camera) {

    this.url = serve.basepath;

  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.nome = this.navParams.get("nome");
    this.website = this.navParams.get("website");
    this.money = this.navParams.get("money");
    this.quantidade = this.navParams.get("quantidade");
    this.descricao = this.navParams.get("descricao");
    this.foto = this.navParams.get("foto");

    console.log(this.website);
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Abrir Midia',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.abrirCamrera();
          }
        }, {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.abrirGaleria();
          }

        }
      ]
    });
    actionSheet.present();
  }


  abrirCamrera() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });

  }

  abrirGaleria() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });

  }



  editar(){

    if(this.nome ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();
    

  }else if(this.nome ==""){

    const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();

  }else{

    let body ={
      id:         this.id,
      nome:       this.nome,
      website:    this.website,
      quantidade: this.quantidade,
      money:      this.money,
      descricao:  this.descricao,
      foto:       this.cameraData,
      crud:       'editar'
    }

    this.serve.postData(body, '/Produtos.php').subscribe(data =>{
    
     this.showInsertOk();
    
    });

  }

  }
    

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto Adicionado com Sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('LojaPage')
          }
        }
      ]
    });
    alert.present();
  }

}

