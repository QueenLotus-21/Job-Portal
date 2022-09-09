import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.css']
})
export class CompanySignupComponent implements OnInit {

  public error:any=[];
  constructor(private userService:UserServiceService ,private router:Router,private notify:SnotifyService) { }


  onSubmit(){
 console.log(this.form);
 this.userService.companySignup(this.form).subscribe(

    data=>this.handleResponse(data),
    //console.log("sucess"),
    //error=>console.log(error),
    error=>this.handleError(error)
  );
  }

  // handleResponse(data){
  //   this.token.handle(data.access_token);
  //   this.router.navigateByUrl('/login');
  //  }

  ngOnInit(): void {
  }

  handleResponse(data){
    // console.log(res)
    this.notify.success(data.message,{timeout:0});
    this.router.navigateByUrl('/login');
   }

  handleError(error){
    this.notify.error(error.error.errors ||error.error.message);
    this.router.navigateByUrl('/signup');
  }

  public form={
    'email':null,
    "password":null,
    'name':null,
    'address':null,
    'role':null,
    'description':null,
    'contact_info':null,
    'gender':null,
    "password_confirmation":null
   }
}
