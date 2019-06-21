import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { ActivatedRoute , Router, NavigationExtras} from '@angular/router';
import { NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {
user_id: any;
emailDetails: any;
  constructor(public userservice: UsermanagementService,  public route:ActivatedRoute, public router: Router,public navCtrl: NavController, public toastController: ToastController) { 
this.route.queryParams.subscribe(params => {
  console.log(params['special'],'spec')
  this.emailDetails=JSON.parse(params['special']);
  console.log(this.emailDetails,'data')
});
  }

  ngOnInit() {
    console.log("step2")
  }


verify(code){
  console.log(code)
this.userservice.VerifyCode(code,this.emailDetails['user_id']).subscribe(res=>{
        console.log(res,'res')
        console.log(res['status']==true)
    if(res['status'] == true){
      let navigationExtras: NavigationExtras = {
         queryParams: {
           user: res['user_id'],
         }
      };
      this.router.navigate(['/step3'],navigationExtras);
    }else{
      this.presentToast("Please enter the valid code")
    }
  
},error=>{
  console.log(error)
});

}

  resendCode(){
   this.userservice.emailVerify(this.emailDetails["email"]).subscribe(res=>{
      let verify_details: any=res;
      if(verify_details['status']== true){
        this.presentToast('Verification code has been sent');  
      }else{
        
      }
   })
  }

  async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
}