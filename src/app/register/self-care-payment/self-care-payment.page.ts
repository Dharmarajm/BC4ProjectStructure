import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OffersPage } from '../offers/offers.page';

declare var RazorpayCheckout: any; 

@Component({
  selector: 'app-self-care-payment',
  templateUrl: 'self-care-payment.page.html',
  styleUrls: ['../main/main.page.scss'],
})
export class selfCarePaymentPage {
  paymentAmount: number = 500;
  currency: string = 'USD';
  currencyIcon: string = '$';
  razor_key = 'rzp_test_D4jgfSRripvke9';
  cardDetails: any = {};
  constructor(private router: Router, public modalController: ModalController) {}


payment(){
  //this.router.navigate(['register/payment-success']);
     /*this.navCtrl.navigateBack('/final-registration');*/

  var options = {
      description: 'Credits towards consultation',
      /*image: 'https://i.imgur.com/3g7nmJC.png',*/
      currency: this.currency,
      key: this.razor_key,
      amount: this.paymentAmount,
      name: 'foo',
      prefill: {
        email: 'adhvik@gmail.com',
        contact: '9621323231',
        name: 'adhvik'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    var successCallback = function (payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  async coupon() {
    const modal = await this.modalController.create({
      component: OffersPage,
      mode: "md"
    });
    return await modal.present();
  }
}