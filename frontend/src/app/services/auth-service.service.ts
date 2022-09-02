import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private user:UserServiceService) { }


  private loggedIn=new BehaviorSubject<any>(this.user.isLoggedIn());
  authStatus=this.loggedIn.asObservable();

 chageAuthStatus(value:boolean){
   this.loggedIn.next(value);
}
}
