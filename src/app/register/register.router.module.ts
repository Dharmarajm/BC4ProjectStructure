import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainPage } from './main/main.page';
import { selfCareRegisterPage } from './self-care-register/self-care-register.page';
import { careGiverRegisterPage } from './care-giver-register/care-giver-register.page';
import { selfCarePaymentPage } from './self-care-payment/self-care-payment.page';
import { offersPage } from './offers/offers.page';
import { paymentSuccessPage } from './payment-success/payment-success.page';

const routes: Routes = [
  {
    path: 'main',
    component: mainPage,
  },
  {
    path: 'self-care-register',
    component: selfCareRegisterPage,
  },
  {
    path: 'care-giver-register',
    component: careGiverRegisterPage,
  },
  {
    path: 'self-care-payment',
    component: selfCarePaymentPage,
  },
  {
    path: 'offers',
    component: offersPage,
  },
  {
    path: 'payment-success',
    component: paymentSuccessPage,
  },
  {
    path: '',
    component: mainPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegisterPageRoutingModule {}
