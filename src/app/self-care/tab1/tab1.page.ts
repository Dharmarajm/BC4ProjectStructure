import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';
//import { Platform} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
pic:any;
initialLogo:any;
profile_pic:any;
tabBar:any;
  constructor( public service: settingsService,private router: Router) {}
  ionViewWillEnter(){
  	this.service.setting().subscribe(res => {
      this.pic = res;
      this.profile_pic = this.pic.profile_pic
      this.initialLogo = this.pic.user_info.name.charAt(0);
      
    })
  }
  // test(){
  //  this.router.navigate(['/self-care-tabs/tabs/tab1/health-diary']);
  // }


 /* ionViewDidEnter()
  { 
   this.subscription = this.platform.backButton.subscribe(()=>{ navigator['app'].exitApp(); });
  } */
}
