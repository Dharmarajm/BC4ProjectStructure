import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-offers',
	templateUrl: 'offers.page.html',
	styleUrls: ['../main/main.page.scss'],
})
export class OffersPage {

	constructor(public modalController: ModalController) { }

	ngOnInit() {


	}

	select() {
		this.modalController.dismiss();
	}

	close() {
		this.modalController.dismiss();
	}
}
