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
      
      if(mail!="" || mail!=undefined || mail!=null){
        this.registerProgress=true;
         this.userservice.emailVerify(mail).subscribe(res=>{
        
        let verify_details: any=res;
            verify_details['email']=mail;
           
         this.registerProgress=false;   
        if(verify_details['status']== true){
        
            let navigationExtras: NavigationExtras = {
              queryParams: {
                special: JSON.stringify(verify_details)
              }
            };
        
        
           this.router.navigate(['/step2'], navigationExtras)
        }
        else{
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
