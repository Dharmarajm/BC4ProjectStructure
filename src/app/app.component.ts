import { Component } from '@angular/core';

import { Platform,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public unsubscribeBackEvent: any;

  public counter = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    public toastController: ToastController,
    private location: Location,
    // private keyboard: Keyboard
  ) {
    this.initializeBackButtonCustomHandler();
    this.initializeApp();
   
  }
  ngOnInit() {
    console.log(this.router.url);
  }
  initializeApp() {
    
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#483df6');

    // this.keyboard.hide();
      /*this.platform.backButton.subscribe(() => {
      if (this.counter == 0) {
         this.counter++;
         this.presentToast();
         setTimeout(() => { this.counter = 0 }, 3000)
       } else {
         // console.log("exitapp");
         navigator['app'].exitApp();
       }
     });  */
    });
  }

  async presentToast() {
   const toast = await this.toastController.create({
     message: "Press again to exit",
     duration: 3000,
   });
  toast.present();
 }
 ionViewWillLeave() {
  this.unsubscribeBackEvent && this.unsubscribeBackEvent();
}
initializeBackButtonCustomHandler(): void {
  this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,()=> {
   console.log(this.router.url);
    if(this.router.url == "/" || this.router.url == "/login"){
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 3000)
      } else {
        // console.log("exitapp");
        navigator['app'].exitApp();
      }
    navigator['app'].exitApp();
   }else{
    // alert("false");
     console.log("false");
      this.location.back();
    }
  });
}
}
