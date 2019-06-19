/*import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router,CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavGuard implements CanActivate  {
  
  constructor(public router: Router) {}

  canActivate(): boolean {
  
    if (!localStorage.getItem('credential')) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }
}*/
