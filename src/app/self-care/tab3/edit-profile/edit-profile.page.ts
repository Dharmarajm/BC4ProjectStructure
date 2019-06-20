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
import { environment } from '../../../../environments/environment'   
import { Base64 } from '@ionic-native/base64/ngx';

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
  constructor(private base64: Base64, private fb: FormBuilder,public sanitizer: DomSanitizer, public route:ActivatedRoute, private file: File, private transfer: FileTransfer, private camera: Camera, private imagePicker: ImagePicker, private webview: WebView, private crop: Crop, public serv:SettingServiceService) { 

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
    this.imagePicker.getPictures(options).then((results) => {
 
      console.log('Image URI: ' + results);
       this.img=results.toString();

       this.reduceImages(results).then(() => {})}, 
       (err) => { console.log(err)
        });
  }
reduceImages(selected_pictures: any) : any{
     return selected_pictures.reduce((promise:any, item:any) => {
     return promise.then((result) => {
     return this.crop.crop(item, {quality: 75}).then(cropped_image => {
        console.log("jfgukhuigfh",cropped_image);
        this.image=cropped_image;
          cropped_image=this.webview.convertFileSrc(cropped_image);
          this.photos.push(cropped_image)
         this.preview=this.photos[0];
         console.log("jfgukhuigfh",this.image)
          
        });     
      });
    }, Promise.resolve());
   }


   
sendEditProfile(val){
  this.base64.encodeFile(this.image).then((base64File: string) => {
  let data={"user_picture" : base64File}
  this.serv.sendimage(data).subscribe(res => {
    console.log(res)
  })
}, (err) => {
  console.log(err);
});
}


}
