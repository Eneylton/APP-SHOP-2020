import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-registrar-loja',
  templateUrl: 'registrar-loja.html',
})
export class RegistrarLojaPage {
  log:           any;
  usuario_id:    any;
  nome:          string = "";
  email:         string = "";
  tel:           string = "";
  whatsapp:      string = "";
  hist:          string = "";
  website:       string = "";
  endereco:      string = "";
  numero:        string = "";
  bairro:        string = "";
  cidade:        string = "";
  estado:        string = "";
  cep:           string = "";
  foto:          string = "";

  base64Image: string = "";
  cameraData: string;
  url:string =  "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private http: Http,
    private storage: Storage,
    private camera: Camera,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuario_id = this.log.id;
      
    });

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
      targetWidth:  1000,
      targetHeight: 800,
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
      targetWidth: 1000,
      targetHeight: 800,
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


  buscarCep() {
    const cep = this.cep;

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.endereco = data.logradouro;
        this.bairro = data.bairro;
        this.cidade = data.localidade;
        this.estado = data.uf;
      });


  }

  cadastrar() {

    if (this.nome == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo Nome da Loja é Obrigatório',
        duration: 3000
      });
      toast.present();


    } else if (this.email == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo Email é Obrigatório',
        duration: 3000
      });
      toast.present();

    }  else if (this.tel == "") {

      const toast = this.toastyCrtl.create({
        message: 'Você precisa adicionar um Nº de telefone !!!',
        duration: 3000
      });
      toast.present();

    }else if(this.cameraData === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Adicione uma Foto !!!',
        duration: 3000
      });
      toast.present();

    } else{

      let body = {
        usuario_id: this.usuario_id,
        nome: this.nome,
        email: this.email,
        tel: this.tel,
        whatsapp: this.whatsapp,
        hist: this.hist,
        website: this.website,
        endereco: this.endereco,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        estado: this.estado,
        cep: this.cep,
        foto: this.cameraData,
        crud: 'adicionar'
      }
      this.serve.postData(body, '/Loja.php').subscribe(data => {

        this.showInsertOk();
      });

    }

    }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
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
