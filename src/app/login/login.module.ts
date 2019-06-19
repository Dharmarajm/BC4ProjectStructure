import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';


import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  { path: 'step1', 
    loadChildren: './forgot-password/step1/step1.module#Step1PageModule' 
  },
  { path: 'step2', 
    loadChildren: './forgot-password/step2/step2.module#Step2PageModule' 
  },
  { path: 'step3', 
    loadChildren: './forgot-password/step3/step3.module#Step3PageModule' 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
