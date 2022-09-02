import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseurl='http://localhost:8000/api';
  constructor(private http:HttpClient) { }



  private _updateMenu=new Subject<void>();
  get updateMenu(){
    return this._updateMenu;
  }
  private _updateMenuAdmin=new Subject<void>();
  get updateMenuAdmin(){
    return this._updateMenuAdmin;
  }

  login(data){
return this.http.post(`${this.baseurl}/login`,data)
  }

  signup(data){
    return this.http.post(`${this.baseurl}/signup`,data);
}

adminSignup(data){
  return this.http.post(`${this.baseurl}/adminSignup`,data);
}
companySignup(data){
  return this.http.post(`${this.baseurl}/companySignup`,data);
}

isLoggedIn(){
  return localStorage.getItem('token')!=null;
}
}
