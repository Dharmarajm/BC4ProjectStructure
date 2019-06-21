import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
details:any;
policyDetail:any;
sms:any;
  selectedSegment:any="first"; 
  //contact declarations
  
  info:any=[{'doctor':[],'emergency':[],'care_giver':[]}];

  constructor(private router: Router, public route:ActivatedRoute, public settingService: settingsService) {

  }


  ngOnInit(){ 
  }


  // About segment code

  ionViewDidEnter(){
    this.settingService.aboutDetail().subscribe(res=>{
  //console.log(res);
  this.details=res;
  this.policyDetail=res['policies'][0]['attribute_name_value'];
  console.log(this.policyDetail)

});

// contact service
 this.settingService.contactDetails().subscribe(res=>{
   console.log(res);
   let contact_details:any=res["emergency_detail"];
   for(let i=0;i<=contact_details.length;i++){
     if(contact_details[i]['user_type'] == 'Emergency'){
       this.info[0]['emergency'].push(contact_details[i])

     }
     else if(contact_details[i]['user_type'] == 'Doctor'){
       this.info[0]['doctor'].push(contact_details[i])

     }
     else if(contact_details[i]['user_type'] == 'Care Giver'){
        this.info[0]['care_giver'].push(contact_details[i])

     }
   }
   console.log(this.info,'info')


 })

  }



  onSegmentChanged(ev) {

  }
editProfileDetails(){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.details)
      }
    }; 

 this.router.navigate(['/self-care-tabs/tabs/tab2/about-update'],navigationExtras)
  }
 
  previewData(){

    console.log(this.details['user_info']['user_uid'])
    let navigationExtra: NavigationExtras = {
      queryParams: {
        user_id:this.details['user_info']['user_uid']
      }
    }; 
    this.router.navigate(['/self-care-tabs/preview'],navigationExtra)
  }


// contact segment code

addContact(){

   this.router.navigate(['/self-care-tabs/tabs/tab2/contact-add'])

}



// Health segment code
updateHealth(){
     this.router.navigate(['/self-care-tabs/tabs/tab2/health-update'])

}
}
