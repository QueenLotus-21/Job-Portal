import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  public error:any=[]
  public jobs:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,
      private notify:SnotifyService,
      private router:Router) { }

    ngOnInit(): void {
      this.showJob()
    }

  showJob(){
    this.jobs=this.user.listJobs().subscribe(res=>{
      this.jobs=res
      //console.log(this.jobs)
    })
  }


  viewUser(id:any){
      this.router.navigate(['/user/viewuser']);
    }
   //this.router.navigateByUrl('/admin/package');


  public form={
    'title':null,
    'role':null,
  }
}
