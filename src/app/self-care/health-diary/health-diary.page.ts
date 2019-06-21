import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';

@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.page.html',
  styleUrls: ['./health-diary.page.scss'],
})
export class HealthDiaryPage implements OnInit {
  health_records:any=[];
  constructor(private router: Router,public settingService: settingsService) { }
  
  ngOnInit(){

  }

  ionViewWillEnter() {
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

}
