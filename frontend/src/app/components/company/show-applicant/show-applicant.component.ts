import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-show-applicant',
  templateUrl: './show-applicant.component.html',
  styleUrls: ['./show-applicant.component.css']
})
export class ShowApplicantComponent implements OnInit {

  jobsId:any
  jobss:any
  applicants:any;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private user: UserServiceService ,
    private formBuilder:FormBuilder,
    private notify:SnotifyService
    ) { }

  ngOnInit(): void {
    const routeParams=this.route.snapshot.paramMap;
    this.jobsId=Number(routeParams.get('jobsId'));
   // console.log(this.adminId);
    this.user.findjob(this.jobsId).subscribe((data:any)=>{
      this.jobss=data;
    })
    this.showUser();
  }

  showUser(){
    this.applicants=this.user.showApllicant().subscribe(res=>{
      this.applicants=res
      console.log(this.applicants)
    })
  }

}
