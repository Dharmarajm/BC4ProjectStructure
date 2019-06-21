import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.page.html',
  styleUrls: ['./health-diary.page.scss'],
})
export class HealthDiaryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearchChange(event){

  }

  healthRecord(){
    this.router.navigate(['/self-care-tabs/tabs/tab1/health-diary/health-diary-record'])
  }

}
