import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-payment-success',
	templateUrl: 'payment-success.page.html',
	styleUrls: ['../main/main.page.scss'],
})
export class paymentSuccessPage {

	constructor(private router: Router) { }

	ngOnInit() {


	}
	registered() {
		this.router.navigate(['self-care-tabs/tabs/tab1']);
	}
}
