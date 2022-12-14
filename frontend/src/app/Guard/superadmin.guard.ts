import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {
  currentRole:any;
  constructor(private user:UserServiceService,private router:Router,private snotify:SnotifyService){}
  canActivate()
    {
      if(this.user.isLoggedIn()){
        this.currentRole=this.user.getRole()
        if(this.currentRole=='superadmin'){
          return true;
        }
        else{
          alert('you are not super admin to access this item');
         // this.snotify.error('you are not super admin to access this item',{timeout:2000});
          return false;
        }
      }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

