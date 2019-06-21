import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { UsermanagementService } from '../../core/services/usermanagement.service';
//import { NavController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-care-giver-register',
  templateUrl: 'care-giver-register.page.html',
})
export class careGiverRegisterPage {
  
  giverForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  id: any;
  value: any;
  language:any;

  constructor(private fb: FormBuilder,private router:Router,public user_service: UsermanagementService,  private translate: TranslateService) { 
    this.language=localStorage.getItem('language');
    console.log(this.language,'ss');
    this.translate.use(this.language);    
  }


  ngOnInit() {
     
     this.giverForm=this.fb.group({
      'u_id':      ['',[Validators.required]], 
    	'name':      ['',[Validators.required]],
    	'mobile_no': ['',[Validators.required,,Validators.minLength(10)]],
      'password':  ['',[Validators.required, Validators.minLength(8)]],
      'password1': ['', [Validators.required, Validators.minLength(8)]],
      'email':     ['',[Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])]],
      'checkStatus':[this.checkStatus,[Validators.pattern('true')]]
     });
      this.giverForm.controls['u_id'].valueChanges.subscribe(val=>{     
       this.id=val;  
     });

  }

  care_giverId(){
      
    this.user_service.verify_CGId(this.id).subscribe(res=>{
          let value:any=res["message"];           
        if(value == 'true')
          console.log('entered correct UID'); 
    }, error=>{(error.status=401)      
          alert("Enter Valid User ID")
    });
      
  }

  hideShowPassword() {

   this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
   this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';

  }

  CareGiverDetail(giver_detail){
    
    let role_id;
    let care_data= giver_detail;
    care_data[role_id]=2
    this.user_service.CGdetails(care_data).subscribe(res=>{
     console.log(res)
    });
    this.router.navigate(['/care-giver-tabs/tabsc/tab1c']);
    
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
