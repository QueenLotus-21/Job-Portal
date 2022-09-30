import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.css']
})
export class UpdateJobsComponent implements OnInit {
  jobId:any;
  jobLists:any;
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
    this.jobId=Number(routeParams.get('jobId'));
   // console.log(this.adminId);
    this.user.findJobList(this.jobId).subscribe((data:any)=>{
      this.jobLists=data;
      console.log(this.jobLists);
    })
    }

    createForm(){
      this.form=this.formBuilder.group({
        name:[null,Validators.required],
        title:[null,Validators.required],
        role:[null,Validators.required],
        gender:[null,Validators.required],
        person:[null,Validators.required],
        description :[null,Validators.required],
        responsibility:[null,Validators.required],
        location:[null,Validators.required],
        contact_info:[null,Validators.required],
        status:[null,Validators.required],
        skill:[null,Validators.required],
        workhour:[null,Validators.required],
      })
    }
   get f(){
   return this.form.controls;
  }
    update(title:string,role:string,gender:string,status:string,skill:string,workhour:string,person:string,description:string,responsibility:string,name:string,location:string,contact_info:string){

  this.user.updateJobPost(this.jobId,this.jobLists).subscribe((res)=>{
    this.data=res
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/company/managePost');
  })
  }

}
