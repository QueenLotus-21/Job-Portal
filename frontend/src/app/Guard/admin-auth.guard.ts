import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  currentRole:any;
  constructor(private user:UserServiceService,private router:Router,private snotify:SnotifyService){}
  canActivate()
    {
      if(this.user.isLoggedIn()){
        this.currentRole=this.user.getRole()
        if(this.currentRole=='admin' || this.currentRole=='superadmin'){
          return true;
        }
        else{
          alert('you are not admin to access this item');
          //this.snotify.error('you are not admin to access this item',{timeout:2000});
          return false;
        }
      }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
