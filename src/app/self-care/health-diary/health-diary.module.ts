import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HealthDiaryPage } from './health-diary.page';
import { TranslateModule } from '@ngx-translate/core';
import { healthDiaryRecord } from './health-diary-record/health-diary-record.page';
import { PipesModule } from '../self-common-service/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: HealthDiaryPage
  },{
    path: 'health-diary-record',
    component: healthDiaryRecord
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HealthDiaryPage,healthDiaryRecord]
})
export class HealthDiaryPageModule {}
