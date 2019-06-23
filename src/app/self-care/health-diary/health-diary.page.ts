import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.page.html',
  styleUrls: ['./health-diary.page.scss'],
})
export class HealthDiaryPage implements OnInit {
  health_records:any=[];
  tabBar:any;
  constructor(private statusBar: StatusBar,private router: Router,public settingService: settingsService) { 
    this.tabBar = document.getElementById('myTabBar').childNodes[0];
    this.tabBar.classList.remove("tab-selected");
  }
  
  ngOnInit(){}

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#ff68ab');

    this.settingService.healthDiaryList().subscribe(res=>{
      let list=res;

      console.log(list)
      this.health_records=res['event_list'];

    })
  }
  onSearchChange(event){
  
   let search=event.detail.value;
   this.settingService.healthDiarySearchList(search).subscribe(res=>{
     console.log(res)
    //this.health_records=res['event_list'];
   })
  }

  healthRecord(){
    this.router.navigate(['/self-care-tabs/tabs/tab1/health-diary/health-diary-record'])
  }

  onCancel(event){
    console.log(event)
  }
  
  deleteEvent(id){
    this.settingService.healthDiaryDeleteEvent(id).subscribe(res=>{
     console.log(res)
    //this.health_records=res['event_list'];
   })
  }
  ionViewWillLeave(){
    this.tabBar.classList.add("tab-selected");
    this.statusBar.backgroundColorByHexString('#483df6');
   } 
}
