import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterPageRoutingModule } from './register.router.module';
import { mainPage } from './main/main.page';
import { careGiverRegisterPage } from './care-giver-register/care-giver-register.page';
import { selfCareRegisterPage } from './self-care-register/self-care-register.page';
import { selfCarePaymentPage } from './self-care-payment/self-care-payment.page';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OffersPage } from './offers/offers.page';
import { paymentSuccessPage } from './payment-success/payment-success.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RegisterPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    mainPage,
    careGiverRegisterPage,
    selfCareRegisterPage,
    selfCarePaymentPage,
    OffersPage,
    paymentSuccessPage
  ]
})
export class registerPageModule { }
