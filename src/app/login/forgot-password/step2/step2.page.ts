import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../../../core/services/usermanagement.service';
import { ActivatedRoute , Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {
  user_id: any;
  verify_code:any;
  constructor(public userservice: UsermanagementService,  public route:ActivatedRoute, public router: Router) { 
   this.route.queryParams.subscribe(params => {
	  console.log(params['special'],'spec')
	  this.user_id=params['special'];
   });
  }

  ngOnInit() {
  }


verify(code){
	console.log(code)
this.userservice.VerifyCode(code,this.user_id).subscribe(res=>{
        console.log(res)
        let verify_details=res;
   let navigationExtras: NavigationExtras = {
      queryParams: {
        user: verify_details['user_id'],
      }
    };
    this.router.navigate(['/step3'])
});
}


}