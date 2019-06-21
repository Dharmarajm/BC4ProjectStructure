import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})

export class HealthPage implements OnInit {
  alergy_name = "";
  medication_name: string;
  autopopulate:boolean = false;
  autopopulate2:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  // Input_alergy(value: string){
  //   this.alergy_name = value;
  //   this.autopopulate = true;
  // }

  Input_medication(value: string){
    this.medication_name = value;
    this.autopopulate2 = true;
  }
}
