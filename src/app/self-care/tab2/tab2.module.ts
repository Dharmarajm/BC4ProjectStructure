import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ModalController } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { contactListPage } from './contact-list/contact-list.page';


const routes: Routes=[
  {  
   path: '',
   component: Tab2Page
  },{
     path: 'about-update',
     loadChildren: './about/about.module#AboutPageModule'
  },{
     path: 'contact-add',
     loadChildren: './contact/contact.module#ContactPageModule'
  },{
     path: 'health-update',
     loadChildren: './health/health.module#HealthPageModule'
  },{
    path: 'contact-list',
    component: contactListPage
  }
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
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2Page,contactListPage]
})
export class Tab2PageModule {}
