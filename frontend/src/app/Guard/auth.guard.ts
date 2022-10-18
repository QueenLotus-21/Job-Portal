import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentRole:any;
  constructor(private service:UserServiceService,private router:Router){}
  canActivate()
    {
      if(this.service.isLoggedIn()){
      return true;
      }
    else{
     this.router.navigate(['login']);
      return false;
    }
  }

}
