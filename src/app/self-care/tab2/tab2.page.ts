import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
   sms:any;
  email:any;
  selectedSegment:any="first"; 
  constructor(private router: Router) {

  }


  ngOnInit(){}



  onSegmentChanged(ev) {
  }


/*editProfileDetails(){
  	console.log("edit")
 this.router.navigate(['/about'])
  }*/
}
  