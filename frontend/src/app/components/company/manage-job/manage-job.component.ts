import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.css']
})
export class ManageJobComponent implements OnInit {

  public error:any=[]
  public jobs:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,private notify:SnotifyService,private router:Router) { }

    ngOnInit(): void {
      this.showJob()
    }

  showJob(){
    this.jobs=this.user.listJobs().subscribe(res=>{
      this.jobs=res
      //console.log(this.jobs)
    })
  }

  public form={
      'title':null,
      'role':null,
      'gender':null,
      'skill':null,
      'workhour':null,
      'name':null,
      'person':null,
      'description':null,
      'responsibility':null,
      'location':null,
      'contact_info':null,
      'status':null,
  }

  deleteJob(id:any){
    this.user.deleteJob(id).subscribe((res)=>{
      this.jobs=this.jobs.filter((a:any)=>a.id==id);
      this.showJob();
     this.notify.success(res.message,{timeout:3000})
      this.router.navigate(['/company/managePost']);
    });
   //this.router.navigateByUrl('/admin/package');
  }


}
