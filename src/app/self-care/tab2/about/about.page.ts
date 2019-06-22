import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  update:FormGroup
  update_details:any;
  policy:any;
  getUpdateData:any;
  getPolicyData:any;
  tabBar:any;
  mediClaim:any;
  policyIssuer:any;
  constructor(private router: Router, private fb: FormBuilder, public userservice: settingsService, public route:ActivatedRoute,public toastController: ToastController) {
    /*let data = this.navParams.get('special');
     this.getUpdateData=data['user_info'];
     this.getPolicyData=data['policies'][0]['attribute_name_value']; */
   
    this.route.queryParams.subscribe(params => {
      console.log(params['special'],'spec')
      this.update_details=JSON.parse(params['special']);
      console.log(this.update_details,'data');
      this.getUpdateData=this.update_details['user_info'];
      if(this.update_details['policies'].length!=0){
        this.getPolicyData=this.update_details['policies'][0]['attribute_name_value'];
        this.mediClaim=this.getPolicyData['mediclaim_policy'];
        this.policyIssuer=this.getPolicyData['policy_issuer'];
      }else{
        this.mediClaim="";
        this.policyIssuer="";
      }
    });

    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';

   }

  ngOnInit() {
   this.update=this.fb.group({
     'blood_group':[this.getUpdateData['blood_group'],[Validators.required]],
     'age':[this.getUpdateData['age'],[Validators.required]],
     'mediclaim_policy':[this.mediClaim,[Validators.required]],
     'policy_issuer':[this.policyIssuer,[Validators.required]]
   })

  }




  updateValues(update){
    console.log(update);
    if( this.update.valid){
    console.log(update)


     let data:any=  { 
                      "user": {
                                "blood_group":update['blood_group'],
                                "age": update['age']
                              },
                      "policy":{
                       "attribute_name_value":{
                                              "mediclaim_policy": update['mediclaim_policy'],
                                              "policy_issuer": update['policy_issuer']
                        }
                       }               
                    }
        this.userservice.aboutUpdate(data).subscribe(res=>{
          console.log(res);
           this.presentToast('Emergency Details updated successfully');  
           this.router.navigate(['/self-care-tabs/tabs/tab2'])
        });

    }else{
      this.presentToast('Please enter the values')
    }
  }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }

    close(){
     this.router.navigate(['/self-care-tabs/tabs/tab2'])
    }

    ionViewWillLeave(){
     this.tabBar.style.display = 'flex'; 
    }

    _keyPress(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      
      if(event.charCode!=0){
        if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
        }
      }
    }
}
