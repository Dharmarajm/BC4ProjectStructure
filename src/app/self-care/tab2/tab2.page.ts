import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { settingsService } from '../self-common-service/settings/settings.service';
import { ModalController } from '@ionic/angular';
import { AboutPage } from './about/about.page';
import { AlertController,ToastController } from '@ionic/angular';

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
  healthDetailList:any[]=[];
  alergiesList:any[]=[];
  currentMedicationList:any[]=[];
  //contact declarations
  user_type: any;
  care_giver:boolean=false;
  emergency:boolean=false;
  doctor:boolean=false;
  info:any=[{'doctor':[],'emergency':[],'care_giver':[]}];
  contact_details:any;
  contect_limitation:any;
  navigateHealth:NavigationExtras;
  navigatePreview:NavigationExtras;
  navigateProfile:NavigationExtras;
  constructor(public toastController: ToastController,public alertController: AlertController, public modalController: ModalController,private router: Router, public route:ActivatedRoute, public settingService: settingsService) {

  }


  ngOnInit(){ 
  }


  // About segment code

  ionViewWillEnter(){
    this.info=[{'doctor':[],'emergency':[],'care_giver':[]}];
    this.settingService.aboutDetail().subscribe(res=>{
     
      this.details=res;
      
      if(this.details['policies'].length!=0){
        this.policyDetail = this.details['policies'][0]['attribute_name_value'];  
      }else{
        this.policyDetail = this.details['policies'];
      }

    },error=>{
     console.log(error)
    });


    this.settingService.myEmergencyHealthDetail().subscribe(res=>{
      let emergencyData=res['health_detail'];
      if(emergencyData.length!=0){
        this.healthDetailList = emergencyData[0]['attribute_name_value'];
        this.alergiesList = this.healthDetailList['allergy'];
        this.currentMedicationList = this.healthDetailList['current_medication']
      }else{
        this.healthDetailList=[];
        this.alergiesList = [];
        this.currentMedicationList = [];
      }
    },error=>{
     console.log(error)
    })

    // contact service
    this.settingService.contactDetails().subscribe(res=>{
    
     this.contact_details = res;
     this.contect_limitation=this.contact_details.count
       console.log(this.contact_details.count);     
      for(let i=0;i<this.contact_details.count;i++){
       this.contact_details.emergency_detail[i].firstleter=this.contact_details.emergency_detail[i].contact_name.charAt(0);


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
    },error=>{
      console.log(error)
    })

  }



  onSegmentChanged(ev) {

  }

  // async openUserModal() {
  //   const modal = await this.modalController.create({
  //     component: UserModalComponent,
  //     componentProps: { users: this.users },
  //   });

  //   modal.onDidDismiss()
  //     .then((data) => {
  //       //const user = data['data']; // Here's your selected user!
  //      this.ionViewWillEnter(); 
  //   });

  //   return await modal.present();
  // }
  
  editProfileDetails(){
    
    this.navigateProfile = {
      queryParams: {
        special: JSON.stringify(this.details)
      }
    }; 

    this.router.navigate(['/self-care-tabs/tabs/tab2/about-update'],this.navigateProfile)
  }

  /*async openUserModal() {
    const modal = await this.modalController.create({
      component: AboutPage,
      componentProps: { special: this.details },
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data['data']; // Here's your selected user!
    });

    return await modal.present();
  }*/
 
  previewData(){

    this.navigatePreview = {
      queryParams: {
        user_id:this.details['user_info']['user_uid']
      }
    }; 
    this.router.navigate(['/self-care-tabs/tabs/tab2/preview'],this.navigatePreview)
  }


// contact segment code

addContact(){
  if (this.contect_limitation == 5) {
    this.presentToast("Maximum 5 contacts allowed")
  }else{
    this.router.navigate(['/self-care-tabs/tabs/tab2/contact-add'])
  }
}
async deleteItem(id){


  const alert = await this.alertController.create({
      header: 'Contact',
      message: 'Are you sure want to delete?',
      mode: 'ios',
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Ok');
            this.settingService.deleteData(id).subscribe(res=>{
                 this.ionViewWillEnter();
                 this.presentToast('Contact has been deleted successfully');
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
   await alert.present();

}
 


  async presentToast(message:string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
  }

  // Health segment code
  updateHealth(){

       this.navigateHealth = {
        queryParams: {
          special: JSON.stringify(this.healthDetailList)
        }
       };

       this.router.navigate(['/self-care-tabs/tabs/tab2/health-update'],this.navigateHealth)

  }
}
