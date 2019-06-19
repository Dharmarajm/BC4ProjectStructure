import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute , Router } from '@angular/router';
import { SettingServiceService } from '../setting-service.service'
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
   

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
editProfileForm:FormGroup
image:any;
preview:any;
photos:any;
uploadURI:any;  
getValue:any;
refresh:any;
user_details:any;
linkSource:any;
img:any;
img1:any;
editprofile:any;
  constructor(private fb: FormBuilder,public sanitizer: DomSanitizer, public route:ActivatedRoute, private file: File, private transfer: FileTransfer, private camera: Camera, private imagePicker: ImagePicker, private webview: WebView, private crop: Crop, public serv:SettingServiceService) { 

  this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        console.log(params)
        this.editprofile = JSON.parse(params.special);
        console.log( this.editprofile,"edit")
        if(this.editprofile["profile_pic"] == null){
          this.img=".././././assets/img/contact.png"
        }
        else{
              this.linkSource = this.editprofile["profile_pic"];
              this.img= this.sanitizer.bypassSecurityTrustResourceUrl(this.linkSource)
              console.log(this.img)
        }
      }
    });

  

  }
 

  ngOnInit() {
    this.editProfileForm=this.fb.group({

    "name":      [this.editprofile["user_info"]["name"],[Validators.required]],
    "email":     [this.editprofile["user_info"]["email"],[Validators.required]],
    "mobile_no": [this.editprofile["user_info"]["mobile_no"],[Validators.required]],
    }); 


     /*this.serv.setting().subscribe(res => {
       this.user_details = res;
       this.linkSource = this.user_details.profile_pic;
       this.img = this.sanitizer.bypassSecurityTrustUrl(this.linkSource)
       this.img1=this.img.changingThisBreaksApplicationSecurity
       console.log(this.img1)
     this.userphoneupdate = this.user_details.user_info.mobile_no;
     this.useremailupdate = this.user_details.user_info.email;
     this.usernameupdate = this.user_details.user_info.name;

     })*/

  }

  // sample(){
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //    fileKey: 'video_upload_file',
  //    fileName: "uri",
  //    mimeType: 'multipart/form-data',
  //    chunkedMode: false,
  //    headers:{ Connection: "close" }

  // }

  
  //   fileTransfer.upload(this.uploadURI,"http://192.168.1.238:4020/users/profile_picture",options).then(res=>{

  //   }).catch();

  // }

openImagePicker(){
    let options= {
      maximumImagesCount: 1,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options).then((results) => {
       console.log(options)
    this.reduceImages(results).then(() => {
      console.log("results",results[0])

      this.file.resolveLocalFilesystemUrl(results[0]).then((fileEntry: FileEntry) => {
         return new Promise((resolve, reject) => {
          fileEntry.file(meta => resolve(meta), error => reject(error));
         });
        }).then((fileMeta: IFile) => {
          let type = fileMeta.type.split('/');
          let dir = fileMeta['localURL']
          this.uploadURI=dir;
          console.log(this.uploadURI)
          //this.playPath=this.uploadURI;
         
       }).catch(err=>console.log(err)); 
      console.log('all images cropped!!');
    //   this.photos = new Array<string>();
    // this.crop.crop(results, {quality: 75}).then((newImage) => {
    //   newImage=this.webview.convertFileSrc(newImage);
    //   this.photos.push(newImage);
    //   this.preview=(this.photos[0]);
    // }, error => console.error("Error cropping image", error));
      });
   }, (err) => { console.log(err) });
  }

reduceImages(selected_pictures: any) : any{
     return selected_pictures.reduce((promise:any, item:any) => {
     return promise.then((result) => {
     return this.crop.crop(item, {quality: 75}).then(cropped_image => {
          cropped_image=this.webview.convertFileSrc(cropped_image);
          this.photos.push(cropped_image)
         this.preview=this.photos[0];
          
        });     
      });
    }, Promise.resolve());
  }

  takePicture(){
  let options =
  {
    quality: 100,
    correctOrientation: true,
    saveToPhotoAlbum: true
  };
  this.camera.getPicture(options)
  .then((data) => {
    this.photos = new Array<string>();
    this.crop.crop(data, {quality: 75}).then((newImage) => {
      newImage=this.webview.convertFileSrc(newImage);
      this.photos.push(newImage);
      this.preview=(this.photos[0]);
    }, error => console.error("Error cropping image", error));
  }, function(error) {
    console.log(error);
  });
}  
sendEditProfile(val){
  console.log(val)
     const fileTransfer: FileTransferObject = this.transfer.create();
    
  //   // let data ={path:this.preview, name : this.usernameupdate, email:this.useremailupdate, mobile_no:this.userphoneupdate}
    
  //   let options: FileUploadOptions = {
  //    fileKey: 'video_upload_file',
  //    fileName: "uri",
  //    mimeType: 'multipart/form-data',
  //    params: data,
  //    chunkedMode: false,
  //    headers:{ Connection: "close" }
  //   }

  //   fileTransfer.upload(this.uploadURI,"http://192.168.1.238:4020/users").then(res=>{
  //   console.log("working",res)
  //   },function(error) {
  //   console.log(error);
  // });

  // const fileTransfer: TransferObject = this.transfer.create();



  let data=val;
  let id=this.editprofile["user_info"]["id"];
  console.log(data,"dataval")
  this.serv.editprofile(data,id).subscribe(res=>{
      console.log(res)
    },error=>{
      alert("Update Failed...")
    })
}


}
