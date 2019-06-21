import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { settingsService } from '../../self-common-service/settings/settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
update:FormGroup
update_details:any;
policy:any;
  constructor( private router: Router, private fb: FormBuilder, public userservice: settingsService, public route:ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      console.log(params['special'],'spec')
      this.update_details=JSON.parse(params['special']);
      console.log(this.update_details,'data');
      

    });

   }

  ngOnInit() {
   this.update=this.fb.group({
     'blood_group':['',[Validators.required]],
     'age':['',[Validators.required]],
     'mediclaim_policy':['',[Validators.required]],
     'policy_issuer':['',[Validators.required]]
   })

  }




  updateValues(update){
    console.log(update);
    if( this.update.valid){
    console.log(update)


  let data:any=  {"user":
        {
                "blood_group":update['blood_group'],
                "age": update['age']
        },
        "policy":
        {
                "attribute_name_value":
                {
                "mediclaim_policy": update['mediclaim_policy'],
                "policy_issuer": update['policy_issuer']
                }
      } }
this.userservice.aboutUpdate(data).subscribe(res=>{
  console.log(res)  
   this.router.navigate(['self-care-tabs/tabs/tab2'])
});

    }
  }
}
