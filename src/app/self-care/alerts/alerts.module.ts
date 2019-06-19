import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlertPage } from './alerts.page';
import { TranslateModule } from '@ngx-translate/core';

/*const routes: Routes = [
  {
    path: 'alertTabs',
    component: AlertPage,
    //loadChildren: './medications/medications.module#MedicationsPageModule'
    children: [
      {
        path: 'self-care-medications',
        children: [
          {
            path: '',
            loadChildren: './medications/medications.module#MedicationsPageModule'
          }
        ]
      },
      {
        path: 'self-care-vitals',
        children: [
          {
            path: '',
            loadChildren: './vitals/vitals.module#VitalsPageModule'
          }
        ]
      },
      {
        path: 'self-care-others',
        children: [
          {
            path: '',
            loadChildren: './others/others.module#OthersPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/alertTabs/self-care-medications',
        pathMatch: 'full'
      }
    ]
   
  },
   {
    path: '',
    redirectTo: '/alertTabs/self-care-medications',
    pathMatch: 'full'
  }
];*/

const routes: Routes = [
  {
    path: '',
    component: AlertPage,
    children: [
      {
        path: 'self-care-medications',
        children: [
          {
            path: '',
            loadChildren: './medications/medications.module#MedicationsPageModule'
          }
        ]
      },
      {
        path: 'self-care-vitals',
        children: [
          {
            path: '',
            loadChildren: './vitals/vitals.module#VitalsPageModule'
          }
        ]
      },
      {
        path: 'self-care-others',
        children: [
          {
            path: '',
            loadChildren: './others/others.module#OthersPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'self-care-medications',
        pathMatch: 'full'
      }
    ]
  },
  {
        path: '',
        redirectTo: 'self-care-medications',
        pathMatch: 'full'
  }
  /*{
    path: 'self-care-medications',
    children: [
      {
        path: '',
        loadChildren: './medications/medications.module#MedicationsPageModule'
      }
    ]
  },
  {
    path: 'self-care-vitals',
    children: [
      {
        path: '',
        loadChildren: './vitals/vitals.module#VitalsPageModule'
      }
    ]
  },
  {
    path: 'self-care-others',
    children: [
      {
        path: '',
        loadChildren: './others/others.module#OthersPageModule'
      }
    ]
  }*/
]  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlertPage],
})
export class AlertPageModule {}
