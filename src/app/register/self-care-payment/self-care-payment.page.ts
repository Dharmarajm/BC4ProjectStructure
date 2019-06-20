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


    /*var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key: 'rzp_test_1DP5mmOlF5G5ag',
  //order_id: 'order_7HtFNLS98dSj8x'
  amount: '5000',
  name: 'foo',
  prefill: {
    email: 'pranav@razorpay.com',
    contact: '8879524924',
    name: 'Pranav Gupta'
  },
  theme: {
    color: '#F37254'
  }
}*/

var successCallback = function(success) {
  alert('payment_id: ' + success.razorpay_payment_id)
  var orderId = success.razorpay_order_id
  var signature = success.razorpay_signature
}

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
}

  RazorpayCheckout.on('payment.success', successCallback)
  RazorpayCheckout.on('payment.cancel', cancelCallback)
  RazorpayCheckout.open(options)

}

  async coupon() {
    const modal = await this.modalController.create({
      component: OffersPage,
      mode: "md"
    });
    return await modal.present();
  }
}