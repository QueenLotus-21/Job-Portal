import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  public error:any=[];
  public users:any=[];
  public user:any=[]

  constructor(private userService:UserServiceService ,private router:Router,private notify:SnotifyService) { }

  ngOnInit(): void {
    this.showJob();
  }
  onSubmit(){
 console.log(this.form);
 this.userService.jobPost(this.form).subscribe(

    data=>this.handleResponse(data),
    error=>this.handleError(error)
  );
  }

  // handleResponse(data){
  //   this.token.handle(data.access_token);
  //   this.router.navigateByUrl('/login');
  //  }
  showJob(){
    this.users=this.user.myListUser().subscribe((res:any)=>{
      //this.users=res
      Object.assign(this.users, res);
      //console.log(this.jobs)
    })
  }


  handleResponse(data){
    // console.log(res)
    this.notify.success(data.message,{timeout:0});
    this.form.name='';
    this.form.role='';
    this.form.skill='';
    this.form.person='';
    this.form.workhour='';
    this.form.status='';
    this.form.description='';
    this.form.responsibility='';
    this.form.contact_info='';
    this.form.title='';
    this.form.location='';
    this.form.gender='';
   }

  handleError(error){
    this.error=error.error.errors;
    this.notify.error(error.error.errors ||error.error.message);
  }

  public form={
    "responsibility":null,
    'name':null,
    'location':null,
    'role':null,
    'description':null,
    'contact_info':null,
    'gender':null,
    "workhour":null,
    "skill":null,
    "title":null,
    "person":null,
    "status":null,
    "user_id":null
   }
}
