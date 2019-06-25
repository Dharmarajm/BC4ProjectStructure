import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TermsConditionsPage } from './login/terms-conditions/terms-conditions.page';
//import { NavGuard } from './core/guards/nav.guard';
const routes: Routes = [
  
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'self-care-tabs', loadChildren: './self-care/tabs/tabs.module#TabsPageModule'  },
  { path: 'care-giver-tabs', loadChildren: './care-giver/tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './register/register.module#registerPageModule' },
  { path: 'terms_conditions',component: TermsConditionsPage}
  /*{ path: 'medications', loadChildren: './self-care/alerts/medications/medications.module#MedicationsPageModule' },
  { path: 'vitals', loadChildren: './self-care/alerts/vitals/vitals.module#VitalsPageModule' },
  { path: 'others', loadChildren: './self-care/alerts/others/others.module#OthersPageModule' }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
