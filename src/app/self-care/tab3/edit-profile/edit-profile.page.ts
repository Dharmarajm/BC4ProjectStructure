import { Component, OnInit,Input } from '@angular/core';
import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { DomSanitizer} from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute , Router } from '@angular/router';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { environment } from '../../../../environments/environment'   
import { Base64 } from '@ionic-native/base64/ngx';
import { NavParams, ModalController, ToastController } from '@ionic/angular';

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
  //preview:any;
  photos:any;
  uploadURI:any;  
  getValue:any;
  refresh:any;
  user_details:any;
  linkSource:any;
  img:any;
  img1:any;
  initialLogo:any;
  editprofile:any;
  cdvFilePath:any = null;
  audioFileName:any;

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
   
   this.cdvFilePath=this.editprofile['profile_pic']
   this.initialLogo = this.editprofile.user_info.name.charAt(0);
   
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


    
     this.userphoneupdate = this.editprofile.user_info.mobile_no;
     this.useremailupdate = this.editprofile.user_info.email;
     this.usernameupdate = this.editprofile.user_info.name;

     

  }

  sample(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let data={}

    let options: FileUploadOptions = {
     fileKey: 'user_picture',
     fileName: this.audioFileName,
     mimeType: 'multipart/form-data',
     params:data,
     chunkedMode: false,
     headers:{ 'Authorization': 'Bearer '+localStorage.getItem('token') }
    }

    fileTransfer.upload(this.cdvFilePath,environment.apiUrl+'users/profile_picture',options).then(res=>{
      this.presentToast('Profile updated successfully');
      console.log(res);
    }).catch();

  }

  openImagePicker(){
    let options= {
      maximumImagesCount: 1,
      outputType: 0
    }
      this.imagePicker.getPictures(options).then((results) => {
         console.log('Image URI: ' + results);
         this.img=results.toString();
         this.crop.crop(this.img, { quality: 100 })
          .then(newImage => {
            console.log(newImage)
          
          //this.reduceImages(results).then(() => {});
          this.file.resolveLocalFilesystemUrl(newImage).then((fileEntry: FileEntry) => {
            return new Promise((resolve, reject) => {
              fileEntry.file(meta => resolve(meta), error => reject(error));
            });
          }).then((fileMeta: IFile) => {
              console.log(fileMeta)
              this.audioFileName = fileMeta.name;
              this.cdvFilePath = fileMeta['localURL'];
              this.sample();   
          })
         },error => console.error('Error cropping image', error));
      },(err) => { 
        console.log(err)
      });
  }
  
  /*reduceImages(selected_pictures: any) : any {
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
       return this.crop.crop(item, {quality: 100}).then(cropped_image => {
        console.log("jfgukhuigfh",cropped_image);
        this.image=cropped_image;
        //cropped_image=this.webview.convertFileSrc(cropped_image);
        //console.log(cropped_image)
        //this.photos.push(cropped_image)
        //this.preview=this.photos[0];
        //console.log("jfgukhuigfh",this.image) 
       });     
      });
    }, Promise.resolve());
  }
*/

   
  sendEditProfile(val){
    if(this.editProfileForm.valid){
       this.userphoneupdate = val.mobile_no;
       this.useremailupdate = val.email;
       this.usernameupdate = val.name;
       
       let data = {   id:this.editprofile.user_info.id, 
                      name : this.usernameupdate, 
                      email:this.useremailupdate, 
                      mobile_no:this.userphoneupdate
                  }
       
       this.serv.editprofile(data, this.editprofile.user_info.id).subscribe(res=>{
        
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
