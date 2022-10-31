import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-applyed-job',
  templateUrl: './applyed-job.component.html',
  styleUrls: ['./applyed-job.component.css']
})
export class ApplyedJobComponent implements OnInit {


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
    this.jobs=this.user.appliedJob().subscribe(res=>{
      this.jobs=res
      //console.log(this.jobs)
    })
  }

  public form={
      'title':null,
      'role':null,
      'skill':null,
      'workhour':null,
      'name':null,
      'description':null,
      'responsibility':null,
      'location':null,
      'contact_info':null,
      'status':null,
  }

}
