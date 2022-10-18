import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  constructor(
    private users:UserServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private notify: SnotifyService
    ) {
   }
  public error:any=[];
  ngOnInit(): void {
  }

  public form={
    "email":null,
    "oldpassword":null,
    "password":null,
    "password_confirmation":null,
   }

   onSubmit(){
  this.users.changeUserPassword(this.form).subscribe(
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
