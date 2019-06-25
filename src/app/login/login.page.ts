import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { NavController,ToastController } from '@ionic/angular';
import { UsermanagementService } from '../core/services/usermanagement.service';
import {TranslateService} from '@ngx-translate/core';
//import { Platform} from '@ionic/angular';

//import { Register } from '../register/main/main';

@Component({  
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formSubmitted:boolean=false;
  show:boolean=false;
  
  @ViewChild('email_auto') email_focus ; 
  constructor(private fb: FormBuilder, private router: Router, public userservice: UsermanagementService, public navCtrl: NavController, private translate: TranslateService,public toastController: ToastController) { 
  this.translate.setDefaultLang('en');
   
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
  }
/*useLanguage(language: string) {
    this.translate.use(language);
}*/
  ngOnInit() {

   

    /*this.loginForm = this.fb.group({
       email: [null,[Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])]],
       password: [null,[Validators.required]],
     }); */
     this.loginForm = this.fb.group({
         email: new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
         password: new FormControl('', Validators.compose([
         Validators.required,
         Validators.minLength(8)
         ])),
     });
  }
  ionViewDidEnter(){
     this.email_focus.setFocus();
  }

  // ionViewDidLoad(){
  //   window.setTimeout(() => {
  //         this.myInput.setFocus();
  //   }, 600);
  // }

  translatetest(lang){
    
    this.translate.use(lang);
    let data=lang;
    
    localStorage.setItem('language',data);
    
  } 

  login_values(credentials){
    console.log(credentials)
    let data:any=credentials['email'].toLowerCase();
    console.log(data)
    let value:any={'email':data,'password':credentials['password']}
    this.formSubmitted=true;
    if(this.loginForm.valid){
       this.userservice.login_credential(value).subscribe(res=>{
      
       let data:any=res["token"];
       let role:any=res["user"];
       let u_uid=role['user_uid']
       
       localStorage.setItem('token',data);
       console.log(data)
       localStorage.setItem('role_id',role["role_id"]);
       localStorage.setItem('user',u_uid);
       if(role["role_id"]==1){
         //this.presentToast('You have Logged in successfully');
         this.router.navigate(['/self-care-tabs/tabs/tab1']);
       }else if(role["role_id"]==2){
         //this.presentToast('You have Logged in successfully');
         this.router.navigate(['/care-giver-tabs/tabsc/tab1c']);
       }else{
         //alert("Invalid credentials");
         this.presentToast('Please enter the valid crendentials');
         this.loginForm.reset();
         localStorage.clear();
       }
        
    },error=>{
      
      if(error.status==401){
       this.presentToast('Please enter the valid crendentials'); 
      }else{
        
      }
     })
   }else{
      this.presentToast('Please enter the valid crendentials'); 
   }
     
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  _keyPress(event: any) {
      const pattern = /^[a-z0-9_@./#&+-]*$/
      let inputChar = String.fromCharCode(event.charCode);
      
      if(event.charCode!=0){
        if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
        }
      }
    }
  // register(){
  //   this.navCtrl.push(Register);
  // }


    /*ionViewDidEnter()
  { 
   this.subscription = this.platform.backButton.subscribe(()=>{ navigator['app'].exitApp(); });
  } */
  ngOnDestroy(){
    this.loginForm.reset();
  }
}
