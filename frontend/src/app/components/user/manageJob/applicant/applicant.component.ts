import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  jobID:any;
  jobs:any=[]
  email:any;
  applicantId:any;
  applicant:any;
  submitted=false;
  form:FormGroup;
  data:any
  err:any
  username:any;
  files:any
  url="assets/images/job1.jpeg";
    constructor( private route: ActivatedRoute,
      private router: Router,
      private user: UserServiceService ,
      private formBuilder:FormBuilder,
      private notify:SnotifyService
      ) { }

    ngOnInit(): void {
    this.createForm();
    this.showApplicant();

      const routeParams=this.route.snapshot.paramMap;
      this.jobID=Number(routeParams.get('jobID'));
     // console.log(this.adminId);
      this.user.findjob(this.jobID).subscribe((data:any)=>{
        this.jobs=data;
        this.jobs.userName=this.username
        this.jobs.userEmail=this.email

        //console.log(this.admins);
      })

      // this.username=this.user.getUserName();
      // console.log(this.username);
      // console.log(this.username);
      // console.log(this.username);

      // this.user.findUser(this.username).subscribe((data:any)=>{
      //   this.applicant=data;
      //   console.log(this.applicant);
      // })

    }

    showApplicant(){

      this.username=this.user.getUserName();
      this.email=this.user.getEmail();
      console.log(this.username)
      console.log(this.email)

      // this.applicant=this.user.listUsers().subscribe(res=>{
      //   if(this.username){
      //     this.applicant=res
      //     console.log(this.applicant)
      //   }
      // }
      // )
      // const routeParams=this.route.snapshot.paramMap;
      // this.applicantId=Number(routeParams.get('1'));
     // console.log(this.adminId);
      // this.user.findUser(1).subscribe((data:any)=>{
      //   this.applicant=data;
        //console.log(this.admins);

    }


   uploadImage(event){
    if(event.target.files){
      this.files=event.target.files[0];
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event1:any)=>{
       this.url=event1.target.result;
      }
    }
   console.log(this.files);
  }

    onSubmit(userName:string,userEmail:string,title:string,role:string,name:string,image:string){
      console.log(this.form);
      const formdata=new FormData();

      formdata.append('name',name)
      formdata.append('userName',userName)
       formdata.append('userEmail',userEmail)
       formdata.append('title',title)
       formdata.append('role',role)
      formdata.append('image',this.files,this.files.name)
    this.user.applyAplicant(formdata).subscribe((res)=>{
        this.data=res
        this.notify.success(this.data.message,{timeout:2000});
        this.router.navigateByUrl('/user/joblist');
      })

       }

    createForm(){
      this.form=this.formBuilder.group({
        userName:[null,Validators.required],
        name:[null,Validators.required],
        userEmail :[null,Validators.required],
        role:[null,Validators.required],
        image:[null,Validators.required],
        title:[null,Validators.required],
      })
    }
   get f(){
   return this.form.controls;
  }
    update(userName:string,userEmail:string,title:string,role:string,name:string,image:string){

      const formdata=new FormData();

    formdata.append('name',name)
    formdata.append('userName',userName)
     formdata.append('userEmail',userEmail)
     formdata.append('title',title)
     formdata.append('role',role)
    formdata.append('image',this.files,this.files.name)
  this.user.applyAplicant(formdata).subscribe((res)=>{
    this.data=res
    this.notify.success( this.data.message,{timeout:2000})
    this.router.navigateByUrl('/user/joblist');
  })
  }

  public form1={
    'userName':null,
    "userEmail":null,
    'name':null,
    'title':null,
    'role':null,
    'image':null,
   }

}
