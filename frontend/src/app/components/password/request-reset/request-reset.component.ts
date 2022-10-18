import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthserviceService } from 'src/app/services/auth-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {


  public form={
    'email':null,
   }

   public error=null;

  constructor(
    private users:UserServiceService,
    private router:Router,
    private notify:SnotifyService,
    private auth:AuthserviceService,

    )
     {}

  resposedata:any;
  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(){
    this.notify.info('wait..',{timeout: 5000});
    this.users.sendPasswordResetEmail(this.form).subscribe(
      // if(data !=null){
      //   this.resposedata=data;
      //   localStorage.setItem('token',this.resposedata.access_token);
      //   console.log('success');
      //   this.router.navigate(['']);
      //   this.auth.chageAuthStatus(true);
      //}
      data=>this.handleResponse(data),
      error=>this.handleError(error)
      )

    };

  handleResponse(res){
   // console.log(res)
   this.notify.success(res.data,{timeout:0})
    this.form.email=null;
  }
  handleError(error){
    this.notify.error(error.error.error ||error.error.message)
   // this.notify.error(error.error.message)

   }
}
