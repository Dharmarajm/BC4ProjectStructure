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
      'u_id':      [null,[Validators.required]], 
    	'name':      [null,[Validators.required]],
    	'mobile_no': [null,[Validators.required]],
      'password':  [null,[Validators.required]],
      'email':     [null,[Validators.email,Validators.required]]
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
}
