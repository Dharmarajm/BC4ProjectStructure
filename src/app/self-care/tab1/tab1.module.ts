import { IonicModule } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {  
    path: '', 
    component: Tab1Page
  },
  { 
    path: 'alerts', 
    loadChildren: '../alerts/alerts.module#AlertPageModule'
  },
  { 
    path: 'appointments', 
    loadChildren: '../appointments/appointments.module#AppointmentsPageModule'
  },
  { 
    path: 'doc-visits', 
    loadChildren: '../doc-visits/doc-visits.module#DocVisitsPageModule'
  },
  { 
    path: 'expenses', 
    loadChildren: '../expenses/expenses.module#ExpensesPageModule'
  },
  { 
    path: 'health-diary', 
    loadChildren: '../health-diary/health-diary.module#HealthDiaryPageModule'
  },
  { 
    path: 'prescriptions', 
    loadChildren: '../prescriptions/prescriptions.module#PrescriptionsPageModule'
  },
  { 
    path: 'reports', 
    loadChildren: '../reports/reports.module#ReportsPageModule'
  },
  { 
    path: 'vitals', 
    loadChildren: '../vitals/vitals.module#AppRoutingModule'
  },
  

];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page],
  
})

/*@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page]
})*/
export class Tab1PageModule {}
