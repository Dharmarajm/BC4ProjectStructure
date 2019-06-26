import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController,ToastController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.page.html',
  styleUrls: ['./health-diary.page.scss'],
})
export class HealthDiaryPage implements OnInit {
  health_records: any = [];
  tabBar: any;
  status: boolean = false;
  constructor(private streamingMedia: StreamingMedia,public toastController: ToastController, private statusBar: StatusBar, private router: Router, public settingService: settingsService, public alertController: AlertController) {
    this.tabBar = document.getElementById('myTabBar').childNodes[0];
    this.tabBar.classList.remove("tab-selected");
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#ff68ab');
    this.tabBar = document.getElementById('myTabBar').childNodes[0];
    this.tabBar.classList.remove("tab-selected");
    this.settingService.healthDiaryList().subscribe(res => {
      let list = res;
      console.log(list)
      this.health_records = res['event_list'];
      this.status = true;
    })
  }
  onSearchChange(event) {

    let search = event.detail.value;
    this.settingService.healthDiarySearchList(search).subscribe(res => {
      console.log(res)
      this.health_records = res['event_list'];
    })
  }

  healthRecord() {
    this.router.navigate(['/self-care-tabs/tabs/tab1/health-diary/health-diary-record'])
  }

  onCancel(event) {
    console.log(event);
  }

  async deleteEvent(id) {

    const alert = await this.alertController.create({
      header: 'Contact',
      message: 'Are you sure want to delete?',
      mode: 'ios',
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            this.settingService.healthDiaryDeleteEvent(id).subscribe(res => {
              console.log(res)
              this.presentToast("Record Deleted Successfully");
              this.ionViewWillEnter();
              //this.health_records=res['event_list'];
            }, error => {
              console.log(error)
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

  

  playHealthRecord(record,data){
     console.log(record,data['events'][0]['event_assets'][0]['url']);
     let url='http://182.72.104.66:8101'+data['events'][0]['event_assets'][0]['url'];
     console.log(url);

     var options: StreamingAudioOptions = {
        bgColor: "#FFFFFF",
        bgImage: 'http://cdn1.theodysseyonline.com/files/2016/01/04/6358748036944186621892622963_music.jpg',
        bgImageScale: "fit", // other valid values: "stretch", "aspectStretch"
        initFullscreen: true, // true is default. iOS only.
        keepAwake: true, // prevents device from sleeping. true is default. Android only.
        successCallback: function() {
          console.log("Player closed without error.");
        },
        errorCallback: function(errMsg) {
          console.log("Error! " + errMsg);
        }
      }; 

     this.streamingMedia.playAudio(url, options);
   }

   stop(){
      this.streamingMedia.stopAudio();
   }
  
   pause(){
    this.streamingMedia.pauseAudio();
   }

   resume(){
    this.streamingMedia.resumeAudio();
   }




  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillLeave() {
    this.tabBar.classList.add("tab-selected");
    this.statusBar.backgroundColorByHexString('#483df6');
  }
}
