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
  }


next(mail){
	this.userservice.emailVerify(mail).subscribe(res=>{
		console.log(res)
		let verify_details=res;
       console.log(verify_details['user_id'])
		let navigationExtras: NavigationExtras = {
      queryParams: {
        special: verify_details['user_id'],
      }
    };
    
    
    this.router.navigate(['/step2'], navigationExtras)
	});


}


}
