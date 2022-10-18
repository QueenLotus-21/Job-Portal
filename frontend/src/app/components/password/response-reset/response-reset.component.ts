import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  constructor(
    private users:UserServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private notify: SnotifyService
    ) {
    route.queryParams.subscribe(params=>{
      this.form.resetToken=params['token']
    });
   }
  public error:any=[];
  ngOnInit(): void {
  }

  public form={
    "email":null,
    "password":null,
    "password_confirmation":null,
    "resetToken":null
   }

   onSubmit(){
  this.users.changePassword(this.form).subscribe(
    data=>this.handleResponse(data),
    error=>this.handleError(error)
  )
   }

   handleResponse(data){
    let _router= this.router;
    //console.log(data);
    this.notify.confirm("Done,Now login with new password",{
      buttons:[
        {text: 'okay', action: toster =>{
          _router.navigateByUrl('/login'),
          this.notify.remove(toster.id)

      }
    },
      ]
    })

   }
   handleError(error){
    this.error=error.error.errors;
   }
}
