import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CgprescriptionsPage } from './cgprescriptions.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CgprescriptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CgprescriptionsPage]
})
export class CgprescriptionsPageModule {}
