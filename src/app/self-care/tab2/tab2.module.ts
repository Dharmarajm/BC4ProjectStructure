import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { TranslateModule } from '@ngx-translate/core';


const routes: Routes=[

{path: '',component: Tab2Page}

]
/*const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    children: [
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: './about/about.module#AboutPageModule'
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: './contact/contact.module#ContactPageModule'
          }
        ]
      },
      {
        path: 'health',
        children: [
          {
            path: '',
            loadChildren: './health/health.module#HealthPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      }
    ]
  },
  {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
  }
]*/
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
