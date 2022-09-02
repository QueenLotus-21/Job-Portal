import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  public error:any=[];
  constructor(private userService:UserServiceService ,private router:Router,private notify:SnotifyService) { }


  onSubmit(){
 console.log(this.form);
 this.userService.adminSignup(this.form).subscribe(

    data=>this.router.navigateByUrl('/login'),
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


  handleError(error){
   this.error=error.error.errors;
  }
  public form={
    'email':null,
    "password":null,
    'name':null,
    'gender':null,
    "password_confirmation":null
   }

}
