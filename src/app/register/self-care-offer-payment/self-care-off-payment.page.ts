import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OffersPage } from '../offers/offers.page';

declare var RazorpayCheckout: any; 

@Component({
  selector: 'app-self-care-off-payment',
  templateUrl: 'self-care-off-payment.page.html',
  styleUrls: ['../main/main.page.scss'],
})
export class selfCareOfferPaymentPage {
  paymentAmount: number = 500;
  
  currencyIcon: string = '$';
  razor_key = 'rzp_test_D4jgfSRripvke9';
  cardDetails: any = {};
  constructor(private router: Router, public modalController: ModalController) {}


payment(){
  //this.router.navigate(['register/payment-success']);
     /*this.navCtrl.navigateBack('/final-registration');*/

  var options = {
      key: this.razor_key,
      description: 'Credits towards consultation',
      /*image: 'https://i.imgur.com/3g7nmJC.png',*/
      currency: "INR",
      amount: this.paymentAmount * 100,
      name: 'BC4',
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

  let router=this.router;
  var successCallback = function(success) {
    
    var orderId = success.razorpay_order_id
    var signature = success.razorpay_signature
    router.navigate(['register/payment-success'])
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