import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        //component: Tab2Page,
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
         /* children: [
        {
          path: 'about',
          children: [
            {
              path: '',
              loadChildren: '../tab2/about/about.module#AboutPageModule'
            }
          ]
        },
        {
          path: 'contact',
          children: [
            {
              path: '',
              loadChildren: '../tab2/contact/contact.module#ContactPageModule'
            }
          ]
        },
        {
          path: 'health',
          children: [
            {
              path: '',
              loadChildren: '../tab2/health/health.module#HealthPageModule'
            }
          ]
        },
        {
          path: '',
          redirectTo: '/tabs/tab2/about',
          pathMatch: 'full'
        }
      ]*/
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  /*declarations: [Tab2Page]*/
})
export class TabsPageRoutingModule {}
