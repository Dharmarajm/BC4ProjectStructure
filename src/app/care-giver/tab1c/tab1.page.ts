import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1cPage {

  constructor(private router: Router) {}
  
  test(){
  	localStorage.clear();
   this.router.navigate(['/login']);
  }
}
