import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3cPage } from './tab3.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
     TranslateModule,
    RouterModule.forChild([{ path: '', component: Tab3cPage }])
  ],
  declarations: [Tab3cPage]
})
export class Tab3PageModule {}
