import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { ActivatedRoute , Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn,AbstractControl  } from '@angular/forms';
import { NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {
new_pwd:any;
confirm_pwd: any;
userData: any;
user: FormGroup;
  constructor(public userservice: UsermanagementService, public route:ActivatedRoute, public router:Router, private fb: FormBuilder,public navCtrl: NavController, public toastController: ToastController) {
     this.route.queryParams.subscribe(params => {
       console.log(params)
    console.log(params['user'])
    this.userData=params['user'];
   });
   }


  ngOnInit() {
    console.log("Step 3");

    this.user = new FormGroup({
password: new FormControl('', [Validators.required]),
re_password: new FormControl('', [Validators.required,this.equalto('password')])
});
  }

equalto(field_name): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {

let input = control.value;

let isValid=control.root.value[field_name]==input
if(!isValid){
return { 'equalTo': {isValid} }
}
else{
return null
}
}
}

updatePassword(val){
  console.log(val)
  console.log(this.user.valid)
  console.log(this.user)
      let data:any={"password": val['password'],"user_id":this.userData};
      console.log(data,'datapwd')
      if(val['password'] == val['re_password'] ){
        this.userservice.pwdUpdate(data).subscribe(res=>{
                let pwdDetails=res;
                console.log(pwdDetails)
            this.router.navigate(['/login'])
          });

      }else{
        //alert('Enter Correct Password')
      }
                   
}

    /*async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
*/

}
