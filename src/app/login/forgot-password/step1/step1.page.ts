import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {
  email:any;
  registerProgress:boolean=false;
  constructor(public userservice: UsermanagementService, public router:Router,public toastController: ToastController) { }

    ngOnInit() {
      
    }

 
    next(mail){
     
      if(this.email!="" && this.email!=undefined && this.email!=null){
        this.registerProgress=true;
        let e_id:any=mail.toLowerCase();
         this.userservice.emailVerify(e_id).subscribe(res=>{
        
        let verify_details: any=res;
        console.log(verify_details)      
         this.registerProgress=false; 

        if(verify_details['status']== true){
        
            let navigationExtras: NavigationExtras = {
              queryParams: {
                special: JSON.stringify(verify_details)
              }
            };
        
           this.presentToast('Verification code has been sent to your Email ID');
           this.router.navigate(['/step2'], navigationExtras)
        }
        else if(verify_details['status']== false){
        //alert("Enter Valid Email-ID")
        this.presentToast('Enter your valid Email ID')
        }
      },error=>{
        this.registerProgress=false;
      });

      }else{
        this.presentToast('Please enter your Email ID')
      }

    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }




}
