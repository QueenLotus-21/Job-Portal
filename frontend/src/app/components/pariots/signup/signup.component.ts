import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public error:any=[];
  constructor(private userService:UserServiceService ,private router:Router,private notify:SnotifyService) { }


  onSubmit(){
 console.log(this.form);
 this.userService.signup(this.form).subscribe(

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
    'age':null,
    'phone':null,
    "employement_status":null,
    'country':null,
    'city':null,
    'role':null,
    'gender':null,
    'profession':null,
    'level_of_education':null,
    "password_confirmation":null
   }

}
