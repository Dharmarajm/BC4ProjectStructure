import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})

export class HealthPage implements OnInit {
  alergy_name:any;
  autopopulate:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  Input_alergy(value: any){
    this.alergy_name = value;
    this.autopopulate = true;
    console.log(value);
  }
}
