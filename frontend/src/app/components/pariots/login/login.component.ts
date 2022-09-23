import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
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

  constructor(private users:UserServiceService,
    private router:Router,
    private auth:AuthserviceService,
    private notify:SnotifyService) {
    localStorage.clear();
   }

  resposedata:any;
  currentRole:any;
  approved:any;

  ngOnInit(): void {
  }

  onSubmit(){
    this.users.login(this.form).subscribe(data=>{
      if(data !=null){
        this.resposedata=data;
        localStorage.setItem('token',this.resposedata.access_token);
        localStorage.setItem('user', this.resposedata.user);
        localStorage.setItem('role', this.resposedata.role);
        localStorage.setItem('approved', this.resposedata.approved);
        localStorage.setItem('email', this.resposedata.email);
        localStorage.setItem('name', this.resposedata.name);
        this.users.updateMenu.next();
        console.log('success');
        this.currentRole=this.users.getRole();
        // console.log(this.currentRole);
        if(this.currentRole=='user'){
          this.router.navigate(['user/userhome']);
        }
        else if(this.currentRole=='admin'){
          this.router.navigate(['admin']);
        }
        else if(this.currentRole=='superadmin'){
          this.router.navigate(['admin']);
        }
        else if(this.currentRole=='company'){
          this.approved=this.users.getApproved();
          if(this.approved=='no'){
            this.router.navigate(['login']);
            this.notify.error('your Account Needs Admin Approval');
          this.form.email='your Account Needs Admin Approval';
          this.form.password='';
          }
          else{
            this.router.navigate(['company/companynav']);
          }
        }
        else{
          this.router.navigate(['']);
        }

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


   displaySignup(){
    let signupform=document.querySelector('.signup-form');
    signupform.classList.add('active');
  }
}
