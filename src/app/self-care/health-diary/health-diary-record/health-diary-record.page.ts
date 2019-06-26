import { Component , OnInit , NgZone } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { File,FileEntry, IFile } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform,AlertController,ToastController } from '@ionic/angular';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-diary-record',
  templateUrl: 'health-diary-record.page.html',
  styleUrls: ['../health-diary.page.scss'],
})
export class healthDiaryRecord {
  
  
  recording: boolean = false;
  filePath: string;
  fileName: string;
  OriginalFileName:any;
  audioRecordPath:any;
  audio: MediaObject;
  audioList: any[] = [];
  sec:number = 0;
  time:any ="00:00:00";
  interval:any;
  zero:any;
  show:any;
  description:any;
  playURI:any;
  isenabled:boolean=true;
  audioTrack:boolean = false;
  recordStart:boolean= false;
  Stop:boolean = false;
  Pause:boolean =false;
  tabBar:any;
  event_name:any;
  progress?: number = 0;
  proBar:boolean=false;

  constructor(private router: Router,public toastController: ToastController,private transfer: FileTransfer,private mediaCapture: MediaCapture,private media: Media,private file: File,public platform: Platform,public alertController: AlertController,public service:settingsService,public _zone: NgZone) {
    this.show=3;
    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';
  }

  ngOnInit() {
  }
  

  start(){
 
      if(this.audioTrack==false && this.recordStart==false){
            
            this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.mp3';
             
             this.file.createFile(this.file.externalDataDirectory ,this.fileName, true).then(() => {
                this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
                
                this.audio = this.media.create(this.filePath);
                this.audioTrack=true;
                this.Stop=true;
                this.Pause=true;
                this.audio.startRecord();

                this.audio.onSuccess.subscribe(() => console.log('Action is successful'));

                this.audio.onError.subscribe(error => console.log('Error!', error));
                this.recording = true;
                this.show = 1;      
           
                this.time ="00:00:00";
                this.sec=0;   
                this.interval =setInterval(() => {
                this.sec +=1 ;
                this.time= this.secondsToTime(this.sec)
                }, 1000);
                this.recording = true; 
             }).catch(e => console.log(e));
        }else{
          if(this.recordStart==false){
             this.audioTrack=false;
             this.Pause=false;
             this.recordStart=true;
             this.audio.pauseRecord();
             clearInterval(this.interval);
             
           }else{
             this.audioTrack=true;
             this.recordStart=false;
             this.Pause=true;
             this.audio.resumeRecord();
             this.interval =setInterval(() => {
              this.sec +=1 ;
              this.time= this.secondsToTime(this.sec)
             }, 1000);
             
           }
        }       
  }

  stop(){ 
        this.isenabled=false; 
        this.Stop=false;  
        this.show = 2;     
        clearInterval(this.interval);
        this.audio.stopRecord();
        this.audio.release();
        this.upload();
    }


    startRecord() {
        if (this.platform.is('ios')) {
          this.fileName = new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
          this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.filePath);
        } else if (this.platform.is('android')) {
          this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
          this.filePath = this.file.dataDirectory.replace(/file:\/\//g, '') + this.fileName;
          this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    }


    stopRecord() {
     this.audio.stopRecord();
     let data = { filename: this.fileName };
     this.audioList.push(data);
     localStorage.setItem("audiolist", JSON.stringify(this.audioList));
     this.recording = false;
     //this.getAudioList();


    }


    secondsToTime(secs){
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        if(seconds < 10){
          this.zero = "0" + seconds;
          seconds = this.zero ;
        }
        if(minutes < 10){
          this.zero = "0" + minutes;
          minutes = this.zero ;
        }
        if(hours < 10){
          this.zero = "0" + hours;
          hours = this.zero ;
        }
        var obj = hours + ":" + minutes + ":" + seconds;
        return obj;
    }

    async upload(){
        
        let fileName = this.fileName;
        
        const alert = await this.alertController.create({
          header: 'Health Record',
          message: '<p>File:'+fileName+'</p>',
          inputs: [
            {
              name: 'related_to',
              placeholder: 'Related to',
            },
            {
              name: 'description',
              placeholder: 'Enter Description',
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
                this.router.navigate(['self-care-tabs/tabs/tab1/health-diary'])
              }
            }, {
              text: 'Save',
              handler: (data) => {

                console.log(data)
              if(data["description"]!="" && data['related_to']!=""){
                this.description = data["description"];
                this.event_name = data['related_to'];
                
                let fromDirectory = this.file.externalDataDirectory ;
                let toDirectory = this.file.externalDataDirectory 
                let OldfileName= this.fileName;
                let NewfileName= this.event_name+'.mp3';
                this.file.copyFile(fromDirectory , OldfileName , toDirectory , NewfileName).then((res) => {
                  console.log(res)
                  this.OriginalFileName=res['name'];
                  let nativeFileURL=res['nativeURL'];
                  let localPlayURL = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.OriginalFileName;
                  console.log(nativeFileURL)
                  this.proBar=true;
                  this.file.resolveLocalFilesystemUrl(nativeFileURL).then((fileEntry: FileEntry) => {
                    return new Promise((resolve, reject) => {
                     fileEntry.file(meta => resolve(meta), error => reject(error));
                    });
                  }).then((fileMeta: IFile) => {
                    console.log(fileMeta)
                     let type = fileMeta.type.split('/');
                     let dir = fileMeta['localURL']
                     this.audioRecordPath=dir;
                      //this.playPath=this.uploadURI;
                      

                      const fileTransfer: FileTransferObject = this.transfer.create();
    
                      let recordParams={
                        "event_name": this.event_name,
                        "description": this.description,
                        "event_type": "health_diary",
                        "event_option":{ "file_name":this.fileName }
                      }

                      let options: FileUploadOptions = {
                       fileKey: 'event_assets',
                       fileName: this.fileName,
                       mimeType: 'multipart/form-data',
                       params:recordParams,
                       chunkedMode: false,
                       headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token') }
                      }

                      fileTransfer.upload(this.audioRecordPath,environment.apiUrl+'events',options).then(res=>{
                           this.proBar=false;
                           this.presentToast('Health diary record updated successfully')
                           this.router.navigate(['self-care-tabs/tabs/tab1/health-diary'])
                      },error=>{
                           this.proBar=false;
                      })

                      fileTransfer.onProgress((progressEvent) => {
     
                        this._zone.run(() => {
                          if (progressEvent.lengthComputable) {
                            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                            this.progress=perc;
                          }
                        })
                      });

                  }).catch(err=>console.log(err)); 
                },err => {
                  console.log('err: ', err);
                });
                
              }else{
                  
                  this.presentToast('Please enter the fields')
                  return false;
              }
             }
            }
          ]
        });

        await alert.present();
        

    }
  

     async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

    /*fileUpload(){
        this.progress=0;
        const fileTransfer: FileTransferObject = this.transfer.create();

        let recordParams={
          "event_name": this.event_name,
          "description": this.description,
          "event_type": "health_diary"
        }

        let options: FileUploadOptions = {
         fileKey: 'event_assets',
         fileName: this.fileName,
         mimeType: 'multipart/form-data',
         params:recordParams,
         chunkedMode: false,
         headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token') }
        }

        fileTransfer.upload(this.audioRecordPath,environment.apiUrl+'events',options).then(res=>{

        }, (err) => {
          console.log(err)
        })
        
        fileTransfer.onProgress((progressEvent) => {
     
          this._zone.run(() => {
            if (progressEvent.lengthComputable) {
              var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
              this.progress=perc;
            }
          })
        });

    }*/

    play(){
       console.log(this.filePath)
       //this.audio = this.media.create(this.filePath);
       this.audio.play();
    }


    ionViewWillLeave(){
     if(this.audioTrack==true){
       this.audioTrack=false;
       this.audio.stop();
       this.audio.release();
     }
     this.tabBar.style.display = 'flex';
    } 

 
}
