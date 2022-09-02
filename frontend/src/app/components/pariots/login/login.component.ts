import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form={
    'email':null,
    "password":null
   }

   public error=null;

  constructor(private users:UserServiceService,private router:Router,private auth:AuthserviceService) {
    localStorage.clear();
   }

  resposedata:any;
  ngOnInit(): void {
  }

  onSubmit(){
    this.users.login(this.form).subscribe(data=>{
      if(data !=null){
        this.resposedata=data;
        localStorage.setItem('token',this.resposedata.access_token);
        localStorage.setItem('user', this.resposedata.user);
        localStorage.setItem('role', this.resposedata.role);
        this.users.updateMenu.next();
        console.log('success');
        this.router.navigate(['']);
        this.auth.chageAuthStatus(true);
      }
    },
    error=>this.handleError(error));



  //  console.log(this.form)
  }
  handleError(error){
    this.error=error.error.error;
   }

   loginClose(){
    let loginForm=document.querySelector('.login-form');
    loginForm.classList.remove('active');
   }

}
