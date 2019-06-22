import { Component, OnInit, ViewChild} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl  } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
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
  medicationChip:any=[];
  alergyChip:any=[]
  tabBar:any;
  diabetes_medications=["Insulin","Tablets"];
  constructor(public router:Router, private fb: FormBuilder) { 
    this.tabBar = document.getElementById('myTabBar');
    this.tabBar.style.display = 'none';
  }

  ngOnInit() {


    this.health=this.fb.group({
      "allergies": [''],
      "heart_conditions":     ['No'],
      "pacemaker" : ['No'],
      "diabetes": ['No'],
      "diabetes_medication": ['Insulin'],
      "bloodpressure":      ['Normal'],
      "implant":     [''],
      "cancer": ['No'],
      "curent_medication":      [''],
      "recent_surgeries": ['']
    });

  
  }
  
  save(val){
      
      var heart_conditions="No"
      if(val["heart_conditions"]=="Yes"){
         heart_conditions="Yes"; 
         if(val["pacemaker"]=="Yes"){
           heart_conditions="pacemaker";
         }
      }else{
        heart_conditions="No"; 
      }
      
      var diabetes="No"
      if(val["diabetes"]=="Yes"){
         diabetes="Yes"; 
         if(val["diabetes_medication"]=="Yes"){
           diabetes="pacemaker";
         }
      }else{
        diabetes="No"; 
      }

      let data={
        "allergies":val["bloodpressure"],
        "heart_conditions":heart_conditions,
        "diabetes":diabetes,
        "bloodpressure":val["bloodpressure"],
        "implant":val["implant"],
        "cancer":val["cancer"],
        "curent_medication":val["curent_medication"],
        "recent_surgeries":val["recent_surgeries"]
      }; 
       
      let navigationExtras: NavigationExtras = {
             queryParams: {
               user: data,
             }
          };
         // this.router.navigate(['/tab2'],navigationExtras);
  }

  // medication(){
  //   debugger;
  //     //this.madicationChip.push(val);
  //     //this.medication_input.setFocus();
  // }

  medication_select(val){
    this.medicationChip.push(val);
    this.health.value["curent_medication"]="";
    this.medication_input.setFocus();
    this.autopopulate2 = false;
  }

  alergyselect(val){
    this.alergyChip.push(val);
    this.health.value["curent_medication"]="";
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

  deleteChip(chip : Element){
    console.log(chip)
    chip.remove();
  }

  deletealergyChip(chip : Element){
    console.log(chip)
    chip.remove();
  }

  ionViewWillLeave(){
     this.tabBar.style.display = 'flex'; 
  }

  close(){
    this.router.navigate(['/self-care-tabs/tabs/tab2'])
  }
}
