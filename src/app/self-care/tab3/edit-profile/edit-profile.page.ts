import { Component, OnInit,Input } from '@angular/core';
import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute , Router } from '@angular/router';
import { settingsService } from '../../self-common-service/settings/settings.service';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { environment } from '../../../../environments/environment'   
import { Base64 } from '@ionic-native/base64/ngx';
import { NavParams, ModalController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userphoneupdate:any;
  useremailupdate:any;
  usernameupdate  :any;
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
  insialLogo:any;
  editprofile:any;
  constructor(private base64: Base64, private fb: FormBuilder,public sanitizer: DomSanitizer, public route:ActivatedRoute, private file: File, private transfer: FileTransfer, private camera: Camera, private imagePicker: ImagePicker, private webview: WebView, private crop: Crop, public serv:settingsService,public navParams: NavParams,public modalController: ModalController,public toastController: ToastController) { 

  // this.route.queryParams.subscribe(params => {
  //     if (params && params.special) {
  //       console.log(params)
  //       this.editprofile = JSON.parse(params.special);
  //       console.log(this.editprofile.profile_pic,"edit")
  //        this.insialLogo = this.editprofile.user_info.name.charAt(0);
  //       if(this.editprofile["profile_pic"] == null){
  //         this.img=".././././assets/img/contact.png"
  //       }
  //       else{
  //             this.linkSource = this.editprofile["profile_pic"];
  //             this.img= this.sanitizer.bypassSecurityTrustResourceUrl(this.linkSource)
  //             console.log(this.img)
  //       }
  //     }
  //   });

   this.editprofile=this.navParams.get('pics');

   this.insialLogo = this.editprofile.user_info.name.charAt(0);
   
  }
 

  ngOnInit() {

    this.editProfileForm=this.fb.group({

    "name":      [this.editprofile["user_info"]["name"],[Validators.required]],
    "email":     [this.editprofile["user_info"]["email"],[Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])]],
    "mobile_no": [this.editprofile["user_info"]["mobile_no"],[Validators.required,Validators.minLength(10)]],
    }); 


     // this.serv.setting().subscribe(res => {
     //   this.user_details = res;
     //   this.linkSource = this.user_details.profile_pic;
     //   this.img = this.sanitizer.bypassSecurityTrustUrl(this.linkSource)
     //   this.img1=this.img.changingThisBreaksApplicationSecurity
     //   console.log(this.img1)
     this.userphoneupdate = this.editprofile.user_info.mobile_no;
     this.useremailupdate = this.editprofile.user_info.email;
     this.usernameupdate = this.editprofile.user_info.name;

     // })

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
    if(this.editProfileForm.valid){
       this.userphoneupdate = val.mobile_no;
       this.useremailupdate = val.email;
       this.usernameupdate = val.name;
       console.log(val)
       this.base64.encodeFile(this.image).then((base64File: string) => {
        let data={"user_picture" : base64File}
        this.serv.sendimage(data).subscribe(res => {
          console.log(res)
        })
       }, (err) => {
        console.log(err);
       });
       let data ={id:this.editprofile.user_info.id, name : this.usernameupdate, email:this.useremailupdate, mobile_no:this.userphoneupdate}
       console.log(data)
       this.serv.editprofile(data, this.editprofile.user_info.id).subscribe(res=>{
        console.log(res)
        this.presentToast('Profile updated successfully');
        this.modalController.dismiss();
       },error=>{
        //alert("Update Failed...")
       })
    }else{
        this.presentToast('Please enter all the fields'); 
    }
       
  }

  close(){
    this.modalController.dismiss();
  }

  async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }


    _keyPress(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      
      if(event.charCode!=0){
        if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
        }
      }
    }

}
