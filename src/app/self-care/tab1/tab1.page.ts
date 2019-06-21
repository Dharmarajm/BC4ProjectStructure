import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
pic:any;
insialLogo:any;
profile_pic:any;
  constructor( public serv: settingsService,private router: Router) {}
  ionViewWillEnter(){
  	this.serv.setting().subscribe(res => {
      this.pic = res;
      this.profile_pic = this.pic.profile_pic
      this.insialLogo = this.pic.user_info.name.charAt(0);
      console.log(this.insialLogo)
      console.log(this.pic.user_info.name.charAt(0))
      console.log(this.pic) 
  })
  }
  // test(){
  //  this.router.navigate(['/self-care-tabs/tabs/tab1/health-diary']);
  // }
}
