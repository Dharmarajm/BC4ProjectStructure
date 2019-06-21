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
  user_type: any;
  care_giver:boolean=false;
  emergency:boolean=false;
  doctor:boolean=false;
  info:any=[{'doctor':[],'emergency':[],'care_giver':[]}];
  contact_details:any;
  constructor(private router: Router, public route:ActivatedRoute, public settingService: settingsService) {

  }


  ngOnInit(){ 
  }


  // About segment code

  ionViewWillEnter(){
  this.info=[{'doctor':[],'emergency':[],'care_giver':[]}];
    this.settingService.aboutDetail().subscribe(res=>{
  //console.log(res);
  this.details=res;
  this.policyDetail=res['policies'][0]['attribute_name_value'];
  console.log(this.policyDetail)

});

// contact service
 this.settingService.contactDetails().subscribe(res=>{
   console.log(res);
   this.contact_details = res;
   for(let i=0;i<this.contact_details.count;i++){


     console.log(this.contact_details.emergency_detail[i].user_type)


     if(this.contact_details.emergency_detail[i].user_type == 'Emergency'){
       this.info[0]['emergency'].push(this.contact_details.emergency_detail[i])

     }
     else if(this.contact_details.emergency_detail[i].user_type == 'Doctor'){
       this.info[0]['doctor'].push(this.contact_details.emergency_detail[i])

     }
     else if(this.contact_details.emergency_detail[i].user_type == 'Care Giver'){
        this.info[0]['care_giver'].push(this.contact_details.emergency_detail[i])

     }
   }
   console.log(this.info,'info')
    // console.log("dfdajlshfulik",this.info.emergency_detail[i].user_type)
     for(let i=0; i<this.info.length; i++){
       // console.log("dfhuashfgjkagkda",this.info.emergency_detail[i].user_type)
      if(this.info[0].care_giver.length != 0){
         this.care_giver=true
       }else{
         this.care_giver=false
       }
        if(this.info[0].emergency.length != 0){
         this.emergency = true;
       }else{
         this.emergency = false;
       }
        if(this.info[0].doctor.length != 0){
         this.doctor = true;
       }else{
         this.doctor = false;
       } 
     }
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
deleteItem(id){

this.settingService.deleteData(id).subscribe(res=>
 {
   console.log(res);
   alert('Contact Deleted')
   this.ionViewDidEnter()
 })
}


// Health segment code
updateHealth(){
     this.router.navigate(['/self-care-tabs/tabs/tab2/health-update'])

}
}
