import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private router: Router) { }
   intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
    });

    return next.handle(authReq).catch((error: any) => {
		if (error instanceof HttpErrorResponse) {
			  
		}
		return Observable.throw(error);
	});
  }

}
