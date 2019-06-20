import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html'
})
export class previewPage implements OnInit {

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
