import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.css']
})
export class UpdateadminComponent implements OnInit {


  adminId:any;
  admins:any;
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
    this.adminId=Number(routeParams.get('adminId'));
   // console.log(this.adminId);
    this.user.findAdmin(this.adminId).subscribe((data:any)=>{
      this.admins=data;
      //console.log(this.admins);
    })
    }

    createForm(){
      this.form=this.formBuilder.group({
        name:[null,Validators.required],
        email :[null,Validators.required],
        role:[null,Validators.required],
        gender:[null,Validators.required],
      })
    }
   get f(){
   return this.form.controls;
  }
    update1(userName:string,email:string,role:string,gender:string){

  this.user.updateAdmin(this.adminId,this.admins).subscribe((res)=>{
    this.data=res
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/admin/manageAdmin');
  })
  }

}
