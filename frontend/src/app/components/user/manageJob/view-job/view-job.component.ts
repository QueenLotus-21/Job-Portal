import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  jobId:any;
  jobs:any=[]
  searchText:any
  submitted=false;
  form:FormGroup;
  imagePath:any='http://127.0.0.1:8000/storage/post/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserServiceService ,
    private formBuilder:FormBuilder,
    private notify:SnotifyService
    ) { }


    ngOnInit(): void {
      this.createForm();
     this.showJob();

    const routeParams=this.route.snapshot.paramMap;
    this.jobId=Number(routeParams.get('jobId'));
   // console.log(this.adminId);
    this.user.findjob(this.jobId).subscribe((data:any)=>{
      this.jobs=data;
      //console.log(this.admins);
    })
    }

      createForm(){
        this.form=this.formBuilder.group({
          CompanyName:[null,Validators.required],
          location :[null,Validators.required],
          JobRole:[null,Validators.required],
          gender:[null,Validators.required],
          description:[null,Validators.required],
          responsibility :[null,Validators.required],
          contact_info:[null,Validators.required],
          status:[null,Validators.required],
          skill:[null,Validators.required],
          workhour :[null,Validators.required],
          person:[null,Validators.required],
          title:[null,Validators.required],
          salary:[null,Validators.required],
          id:[null,Validators.required],
          created_at:[null,Validators.required],
        })
      }
     get f(){
     return this.form.controls;
    }

    buyPackage(event:MouseEvent){
      this.router.navigateByUrl('user/pay');
    }

    showJob(){
      this.jobs= this.user.listJobs().subscribe(res=>{
        this.jobs=res;
       })
     }

  // public form={
  //   "responsibility":null,
  //   'name':null,
  //   'location':null,
  //   'role':null,
  //   'description':null,
  //   'contact_info':null,
  //   'gender':null,
  //   "workhour":null,
  //   "skill":null,
  //   "title":null,
  //   "person":null,
  //   "status":null
  //  }
    }


