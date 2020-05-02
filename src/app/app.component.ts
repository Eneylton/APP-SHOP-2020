import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;
  rootPage: any;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private storage: Storage) {

    this.initializeApp();

    this.pages = [
      { title: 'Usuario', component: 'HomePage' },
      { title: 'Lojas', component: 'LojaPage' },
      { title: 'Produtos', component: 'ListarProdutosPage' }
    ];

   }
   initializeApp(){
      this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
    this.storage.get('session_storage').then((res)=>{

      if(res == null){

        this.rootPage = 'LoginPage';

      }else{
        this.rootPage = 'TabsPage';
      }

    })

}
openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
} 

}
