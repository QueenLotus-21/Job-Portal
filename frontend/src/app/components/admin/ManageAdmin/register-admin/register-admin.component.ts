import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  public error:any=[];
  constructor(private userService:UserServiceService ,private router:Router,private notify:SnotifyService) { }


  ngOnInit(): void {
  }

  onSubmit(){
 console.log(this.form);
 this.userService.adminSignup(this.form).subscribe(res=>{
  this.handleResponse(res),
//reset the value of sets
   this.form.name="";
   this.form.email="";
   this.form.role="";
   this.form.password="";
   this.form.gender="";
   this.form.password_confirmation="";
 },
 error=>{
  this.handleError(error)
} );
  }

  handleResponse(res){
    this.notify.success(res.message)
   }
  handleError(error){
   this.error=error.error.errors;
  }
  public form={
    'email':null,
    "password":null,
    'name':null,
    'role':null,
    'gender':null,
    "password_confirmation":null
   }

}
