import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
})
export class PrescriptionsPage implements OnInit {
tab_details: any;
details: any;
date: any;
value: string= "ADD"
  constructor(private router: Router) { }

  ngOnInit() {
  }


addPrescription(val){
	this.date = new Date();
  console.log(this.date)
	if(val == 'add Prescription'){
	
    this.router.navigate(['add-prescription']);
  }else{
  	let navigationExtras: NavigationExtras = {
      queryParams: {
        viewprescription: JSON.stringify(val)
      }
    };
    this.router.navigate(['view-prescription'],navigationExtras);
}
}

}
