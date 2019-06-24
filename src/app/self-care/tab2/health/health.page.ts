import { Component, OnInit, ViewChild} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { settingsService } from '../../self-common-service/settings/settings.service';
import { ToastController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})

export class HealthPage implements OnInit {
  @ViewChild('medication') medication_input;
  @ViewChild('alergy_name') alergies_input;
  data1: any;
  medication_name: any;
  autopopulate:boolean = false;
  autopopulate2:boolean = false;
  health:FormGroup;
  
  medicationChiptest:any[]=[];
  
  alergyChiptest:any[]=[]
  tabBar:any;
  allHealthData:any;
  diabetes_medications=["Insulin","Tablets"];
  constructor(public router:Router,public route:ActivatedRoute,private fb: FormBuilder,public service:settingsService,public toastController: ToastController,private changeRef: ChangeDetectorRef) { 
    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';
    this.route.queryParams.subscribe(params => {
      console.log(JSON.parse(params['special']))
      this.allHealthData=JSON.parse(params['special']);
      
      this.medicationChiptest = this.allHealthData['current_medication'] || [];
      this.alergyChiptest = this.allHealthData['allergy'] || [];
      if(this.allHealthData['current_medication']==undefined){
         this.medicationChiptest=[];
      }else if(this.allHealthData['current_medication']==undefined){
         this.alergyChiptest=[];   
      }
    })
  }

  ngOnInit() {
    this.changeRef.detectChanges();
    let heart_condition:string;
    let pacemaker:string;
    if(this.allHealthData['heart_condition']=='Pacemaker'){
       heart_condition = 'Yes';
       pacemaker = 'Yes';
    }else if(this.allHealthData['heart_condition']=='Tablets'){
       heart_condition = 'Yes';
       pacemaker = 'No';
    }else{
       heart_condition = 'No';
       pacemaker = 'No';
    }
    
    let diabetes:string;
    let diabetes_through:string;
    if(this.allHealthData['diabetes']=='Insulin'){
       diabetes = 'Yes';
       diabetes_through = 'Insulin';
    }else if(this.allHealthData['diabetes']=='Tablets'){
       diabetes = 'Yes';
       diabetes_through = 'Tablets';
    }else{
       diabetes = 'No';
       diabetes_through = 'Insulin';
    }
     
    this.health=this.fb.group({
      "allergies": [''],
      "heart_conditions":[heart_condition],
      "pacemaker" : [pacemaker ],
      "diabetes": [diabetes],
      "diabetes_medication": [diabetes_through],
      "bloodpressure":[this.allHealthData['blood_pressure'] || 'Normal'],
      "implant":[this.allHealthData['implants'] || ''],
      "cancer":[this.allHealthData['cancer'] || 'No'],
      "curent_medication":[''],
      "recent_surgeries": [this.allHealthData['recent_surgeries'] || '']
    });
    
    //this.alergies_input.setFocus();
   
  }

  ionViewDidEnter(){
    this.alergies_input.setFocus();
  }
  
  save(val){
      
      let heart_conditions="No"
      if(val["heart_conditions"]=="Yes"){
         heart_conditions="Yes"; 
         if(val["pacemaker"]=="Yes"){
           heart_conditions="Pacemaker";
         }
      }else{
        heart_conditions="No"; 
      }
      
      let diabetes="No"
      if(val["diabetes"]=="Yes"){
         diabetes="Yes"; 
         if(val["diabetes_medication"]=="Insulin"){
           diabetes="Insulin";
         }else if(val["diabetes_medication"]=="Tablets"){
           diabetes="Tablets";
         }
      }else{
        diabetes="No"; 
      }
  
      let data={
         "attribute_name_value":{
                    "allergy":this.alergyChiptest,
                    "heart_condition":heart_conditions,
                    "diabetes":diabetes,
                    "blood_pressure":val["bloodpressure"],
                    "implants":val["implant"],
                    "cancer":val["cancer"],
                    "current_medication":this.medicationChiptest,
                    "recent_surgeries":val["recent_surgeries"]   
         }
      }; 
       
      this.service.myEmergencyHealthUpdate(data).subscribe(res=>{
         
         this.presentToast('Health data updated successfully')
         this.router.navigate(['self-care-tabs/tabs/tab2'])
      },error=>{

      })
         // this.router.navigate(['/tab2'],navigationExtras);
  }

  // medication(){
  //   debugger;
  //     //this.madicationChip.push(val);
  //     //this.medication_input.setFocus();
  // }

  medication_select(val:any){
    console.log(val)
    this.medicationChiptest.push(val);
    
    this.health.value["curent_medication"]="";  
    this.medication_input.value="";
    this.medication_input.setFocus();
    this.autopopulate2 = false;
  }

  alergyselect(val:any){
    console.log(val)
    this.alergyChiptest.push(val);
    this.health.value["allergies"]="";
    this.alergies_input.value="";
    this.alergies_input.setFocus();
    this.autopopulate = false;
  }

  Input_medication(value: any){
    this.medication_name = value;
    this.autopopulate2 = true;
  }
  
  Input_alergy(value: any){
   
    this.data1 = value;
    this.autopopulate = true;
  }

  deleteMedicationChip(index:number){
    this.medicationChiptest.splice(index,1)
  }

  deleteAlergyChip(index:number){
    this.alergyChiptest.splice(index,1);
  }

  async presentToast(message:string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
  }

  ionViewWillLeave(){
     this.tabBar.style.display = 'flex'; 
  }

  close(){
    this.router.navigate(['self-care-tabs/tabs/tab2'])
  }
}
