import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {
new_pwd:any;
confirm_pwd: any;
user_id: any;

  constructor(public userservice: UsermanagementService, public route:ActivatedRoute, public router:Router) {
	   this.route.queryParams.subscribe(params => {
       console.log(params)
		console.log(params['user'])
		this.user_id=params['user'];
	 });
   }


  ngOnInit() {
  }

updatePassword(){
  	let password=this.new_pwd;
  	let confirm_password=this.confirm_pwd;
  	console.log(this.new_pwd);
    console.log(this.confirm_pwd);
        let data=password;
        data['user_id']=this.user_id;
        console.log(data,'datapwd')
  	this.userservice.pwdUpdate(data).subscribe(res=>{
        let pwdDetails=res;
        console.log(pwdDetails)
    this.router.navigate(['/login'])
	})
	
}
}
