import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  userId:any;
  users:any;
  submitted=false;
  form:FormGroup;
  data:any
  err:any
    constructor( private route: ActivatedRoute,
      private router: Router,
      private user: UserServiceService ,
      private formBuilder:FormBuilder,
      private notify:SnotifyService
      ) { }

    ngOnInit(): void {
    this.createForm();
    const routeParams=this.route.snapshot.paramMap;
    this.userId=Number(routeParams.get('userId'));
    console.log(this.userId);
    this.user.findUser(this.userId).subscribe((data:any)=>{
      this.users=data;
      console.log(this.users);
    })
    }

    createForm(){
      this.form=this.formBuilder.group({
        name:[null,Validators.required],
        email :[null,Validators.required],
        role:[null,Validators.required],
        approved:[null,Validators.required],
      })
    }
   get f(){
   return this.form.controls;
  }
    update1(userName:string,email:string,role:string){

  this.user.updateUser(this.userId,this.users).subscribe((res)=>{
    this.data=res
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/admin/manageuser');
  })
  }

}
