import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');

      if(localStorage.getItem('token')!=undefined){
        if(localStorage.getItem('rold_id')=="1"){
          this.router.navigate(['self-care-tabs/tabs/tab1']);
        }else if(localStorage.getItem('rold_id')=="2"){
          this.router.navigate(['care-giver-tabs/tabsc/tab1c']);
        }else{

        }
      }else{
        this.router.navigate(['login']);
      }
    });
  }
}
