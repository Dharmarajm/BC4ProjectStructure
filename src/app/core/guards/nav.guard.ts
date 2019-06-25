/*import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavGuard implements CanActivate  {
  
  constructor(public router: Router) {}

  canActivate(): boolean {
  
    if(localStorage.getItem('token')!=undefined){
        if(localStorage.getItem('rold_id')=="1"){
          this.router.navigate(['self-care-tabs/tabs/tab1']);
        }else if(localStorage.getItem('rold_id')=="2"){
          this.router.navigate(['care-giver-tabs/tabsc/tab1c']);
        }
      }else{
        this.router.navigate(['login']);
      }

    
    return true;
  }
}
*/