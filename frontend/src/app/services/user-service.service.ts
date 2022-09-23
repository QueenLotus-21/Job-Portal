import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
getRole(){
  return localStorage.getItem('role');
}
getApproved(){
  return localStorage.getItem('approved');
}
getToken(){
  return localStorage.getItem('token')||'';
}
getUserName(){
  return localStorage.getItem('user');
}
getEmail(){
  return localStorage.getItem('email');
}
getName(){
  return localStorage.getItem('name');
}


httpOptions={
  headers: new HttpHeaders({
    'content-Type':'application/json'
  })
};

//users
 listUsers(){
  return this.http.get<any>(`${this.baseurl}/user`);
}
findUser(id:number): Observable<any>{
  return this.http.get(`${this.baseurl}/user/`+id);
}

updateUser(id:number, user:any): Observable<any>{
  return this.http.put<any>(`${this.baseurl}/user/`+id ,user, this.httpOptions);
}
deleteUser(id:number): Observable<any>{
  return this.http.delete<any>(`${this.baseurl}/user/`+id , this.httpOptions);
}

registerUser(data){
  return this.http.post(`${this.baseurl}/registeruser`,data)
 }

 //manage Admin
 listAdmin(){
  return this.http.get<any>(`${this.baseurl}/admin`);
}
findAdmin(id:number): Observable<any>{
  return this.http.get(`${this.baseurl}/admin/`+id);
}

updateAdmin(id:number, admin:any): Observable<any>{
  return this.http.put<any>(`${this.baseurl}/admin/`+id ,admin, this.httpOptions);
}
deleteAdmin(id:number): Observable<any>{
  return this.http.delete<any>(`${this.baseurl}/admin/`+id , this.httpOptions);
}

registerAdmin(data){
  return this.http.post(`${this.baseurl}/adminSignup`,data)
 }

 //manage companies and jobs
 jobPost(data){
  return this.http.post(`${this.baseurl}/post`,data);
 }
 listJobs(){
  return this.http.get<any>(`${this.baseurl}/job`);
}
findjob(id:number): Observable<any>{
  return this.http.get(`${this.baseurl}/job/`+id);
}
//manage companies and jobs
applyAplicant(data:any){
  return this.http.post(`${this.baseurl}/applicant`,data);
 }
 listApplicants(){
  return this.http.get<any>(`${this.baseurl}/applicant`);
}
findApplicants(id:number): Observable<any>{
  return this.http.get(`${this.baseurl}/applicant/`+id);
}

}
