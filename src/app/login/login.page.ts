import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsermanagementService } from '../core/services/usermanagement.service';
import {TranslateService} from '@ngx-translate/core';

//import { Register } from '../register/main/main';

@Component({  
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public userservice: UsermanagementService, public navCtrl: NavController, private translate: TranslateService) { 
  this.translate.setDefaultLang('en');
   
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
  }
/*useLanguage(language: string) {
    this.translate.use(language);
}*/
  ngOnInit() {

    this.loginForm = this.fb.group({
       email: [null,[Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])]],
       password: [null,[Validators.required]],
     }); 
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
     this.userservice.login_credential(credentials).subscribe(res=>{
       console.log(res);
       let data:any=res["token"];
       let role:any=res["user"];

       console.log(data,"token")
       localStorage.setItem('token',data);
       localStorage.setItem('rold_id',role["role_id"]);
       localStorage.setItem('user',role);
       if(role["role_id"]==1){
         this.router.navigate(['/self-care-tabs/tabs/tab1']);
       }else if(role["role_id"]==2){
         this.router.navigate(['/care-giver-tabs/tabsc/tab1c']);
       }else{
         alert("Invalid credentials");
         localStorage.clear();
       }
        
      
    },error=>{
       alert("login faild,Please enter correct credentials")
     })
  }
  // register(){
  //   this.navCtrl.push(Register);
  // }
}
