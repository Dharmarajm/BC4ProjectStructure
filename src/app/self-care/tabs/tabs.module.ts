import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { previewPage } from '../tab2/preview/preview.page';
import { TranslateModule } from '@ngx-translate/core';
import { settingsService } from '../self-common-service/settings/settings.service';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage,previewPage],
  providers: [settingsService]
})
export class TabsPageModule {}
