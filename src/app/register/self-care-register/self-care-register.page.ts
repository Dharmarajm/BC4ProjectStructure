import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsermanagementService } from '../../core/services/usermanagement.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-self-care-register',
	templateUrl: 'self-care-register.page.html',
	styleUrls: ['../main/main.page.scss'],
})
export class selfCareRegisterPage {
	detailForm: FormGroup
	showBackdrop: boolean = false;
	constructor(private router: Router, private fb: FormBuilder, public user_service: UsermanagementService, public navCtrl: NavController, public toastController: ToastController) { }

	ngOnInit() {
		this.detailForm = this.fb.group({
			'name': [null, [Validators.required]],
			'email': [null, [Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])]],
			'mobile_no': [null, [Validators.pattern('[6-9]\\d{9}')]],
			'address': [null, [Validators.required]],
			'country': [null, [Validators.required]],
			'care_name': [null, []],
			'care_mobile': [null, []],
			'password': [null, [Validators.required]],
			'password1': [null, [Validators.required]],

		});
	}

	self_detail(detail) {
		// console.log(detail)
		// let data = {
		// 	"user": {
		// 		'name': detail.name,
		// 		'email': detail.email,
		// 		'password': detail.password,
		// 		'passowrd1': detail.password1,
		// 		'mobile_no': detail.mobile_no,
		// 		'address': detail.address,
		// 		'country': detail.country,
		// 		'blood_group': '',
		// 		'age': '',
		// 		'role_id': 1
		// 	},
		// 	"caregiver": {
		// 		'name': detail.care_name,
		// 		'mobile_no': detail.care_mobile,
		// 		'role_id': 2
		// 	}
		// }


		// this.user_service.care_detail(data).subscribe(res => {
		// 	console.log(res)

		// 	this.router.navigate(['register/self-care-payment']);
		// });
		this.router.navigate(['register/self-care-payment']);

	}

	async toast(toast_message: string) {
		toast_message = "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
		const toast = await this.toastController.create({
			message: toast_message,
			position: 'bottom',
			keyboardClose: true,
			buttons: [
				{
					side: 'end',
					icon: 'close',
					role: 'cancel'
				}
			]
		});
		toast.present();
	}

	showinfo(toast_message: string) {
		this.toastController.dismiss().then((obj) => {
		}).catch(() => {
		}).finally(() => {
			this.toast(toast_message);
		});
	}
}
