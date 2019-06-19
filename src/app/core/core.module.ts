import { NgModule,Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';
//import { UsermanagementService } from './services';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    InterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
   // UsermanagementService
  ],
  declarations: []
})
export class CoreModule {
   constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }