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

  @ViewChild('myInput') myInput ;
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
  

  ionViewDidLoad(){
    window.setTimeout(() => {
          this.myInput.setFocus();
    }, 600);
  }

  translatetest(lang){
    console.log(lang);
    this.translate.use(lang);
    let data=lang;
    console.log(data)
    localStorage.setItem('language',data);
    console.log(localStorage.getItem('language'))
  } 

  login_values(credentials){
    console.log(credentials)
    this.formSubmitted=true;
    if(this.loginForm.valid){
       this.userservice.login_credential(credentials).subscribe(res=>{
       console.log(res);
       let data:any=res["token"];
       let role:any=res["user"];

       console.log(data,"token")
       localStorage.setItem('token',data);
       localStorage.setItem('rold_id',role["role_id"]);
       localStorage.setItem('user',role);
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
      console.log(error.status==401)
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
}
