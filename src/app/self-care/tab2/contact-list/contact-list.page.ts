import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
	selector: 'app-contact-list',
	templateUrl: 'contact-list.page.html',
})
export class contactListPage {

	constructor(private router: Router, public navParams: NavParams) { 
		let data=this.navParams.get('value')
         console.log(data)
         let contact_name:any=data[0]['_objectInstance']['Name']
         console.log(contact_name)
         let number:any=data[0]['_objectInstance']['phoneNumber']
         console.log(number)
	}

	ngOnInit() {
	}

	close(){
  		this.modalController.dismiss();
  }

}