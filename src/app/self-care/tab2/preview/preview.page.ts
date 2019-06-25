import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.scss']
})
export class previewPage implements OnInit {
  previewData:any;
  user_uid:any;
  Contactinfo:any=[{'doctor':[],'emergency':[],'care_giver':[]}];

  emergency:boolean=false;
  care_giver:boolean=false;
  doctor:boolean=false;
  healthDetailList:any;
  alergiesList:any[]=[];
  currentMedicationList:any[]=[];
  healthDetails:any;
  policyDetail:any;
  user:any;
  tabBar:any;
  

  constructor(public modalController: ModalController,public service: settingsService,private changeRef: ChangeDetectorRef) { 
    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';
  }
  
  ngOnInit(){
    this.changeRef.detectChanges();
  }

  ionViewWillEnter() {
    this.service.myEmergencyPreview().subscribe(res=>{
       this.previewData=res;
       this.healthDetails=this.previewData['health_detail'];
       if(this.healthDetails!=null){
         this.alergiesList = this.healthDetails['attribute_name_value']['allergy']  || [];
         this.currentMedicationList = this.healthDetails['attribute_name_value']['current_medication'] || [];
       }else{
         this.alergiesList=[];
         this.currentMedicationList=[];
       }


       this.user = this.previewData['user'];
       this.policyDetail = this.previewData['policy_details'];
       console.log(this.previewData)
        for(let i=0;i<this.previewData['contacts'].length;i++){
            console.log(this.previewData['contacts'].length)
         this.previewData['contacts'][i].firstleter=this.previewData['contacts'][i].contact_name.charAt(0);
         if(this.previewData['contacts'][i].user_type == 'Emergency'){
           this.Contactinfo[0]['emergency'].push(this.previewData['contacts'][i])
             
         }
         else if(this.previewData['contacts'][i].user_type == 'Doctor'){
           this.Contactinfo[  0]['doctor'].push(this.previewData['contacts'][i])

         }
         else if(this.previewData['contacts'][i].user_type == 'Care Giver'){
            this.Contactinfo[0]['care_giver'].push(this.previewData['contacts'][i])

         }
        }

        for(let i=0; i<this.Contactinfo.length; i++){
         // console.log("dfhuashfgjkagkda",this.info.emergency_detail[i].user_type)
          if(this.Contactinfo[0].care_giver.length != 0){
             this.care_giver=true
           }else{
             this.care_giver=false
           }
            if(this.Contactinfo[0].emergency.length != 0){
             this.emergency = true;
           }else{
             this.emergency = false;
           }
            if(this.Contactinfo[0].doctor.length != 0){
             this.doctor = true;
           }else{
             this.doctor = false;
           } 
       }


    })
  }

	close() {
		this.modalController.dismiss();
  }

  ionViewWillLeave(){
     this.tabBar.style.display = 'flex'; 
  }

}
