import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {
  email:any;
  constructor(public userservice: UsermanagementService, public router:Router) { }

  ngOnInit() {
    console.log("step1")
  }


next(mail){
  this.userservice.emailVerify(mail).subscribe(res=>{
    console.log(res)
    let verify_details: any=res;
        verify_details['email']=mail;
       console.log(verify_details['user_id'])
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
  }
  });


}


}
