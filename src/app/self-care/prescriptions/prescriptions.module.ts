import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrescriptionsPage } from './prescriptions.page';
import { TranslateModule } from '@ngx-translate/core';

import { AddPrescriptionPage } from './add-prescription/add-prescription.page'
import { EditPrescriptionPage } from './edit-prescription/edit-prescription.page'
import { ViewPrescriptionPage } from './view-prescription/view-prescription.page'

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionsPage
  },
  {
    path: 'add-prescription',
    component: AddPrescriptionPage
  },
  {
    path: 'edit-prescription',
    component: EditPrescriptionPage
  },
  {
    path: 'view-prescription',
    component: ViewPrescriptionPage
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
  declarations: [PrescriptionsPage,AddPrescriptionPage, EditPrescriptionPage, ViewPrescriptionPage]
})
export class PrescriptionsPageModule {}
