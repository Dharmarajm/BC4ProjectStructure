import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html'
})
export class AddPrescriptionPage implements OnInit {

  prescriptionForm: FormGroup
  pres_details: any;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

  	this.prescriptionForm=this.fb.group({
  	'doc_name':          ['',[Validators.required]], 
  	'prescription_date': ['',[Validators.required]],
  	'description':      ['',[Validators.required]]
     
  	});
  }

  prescriptionDetails(value){
    console.log(value) 
    //this.pres_details.push(value)
    //console.log(this.pres_details)
    this.router.navigate(['prescriptions']);
  }

}