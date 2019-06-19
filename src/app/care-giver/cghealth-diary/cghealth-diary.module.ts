import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CghealthDiaryPage } from './cghealth-diary.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CghealthDiaryPage
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
  declarations: [CghealthDiaryPage]
})
export class CghealthDiaryPageModule {}
