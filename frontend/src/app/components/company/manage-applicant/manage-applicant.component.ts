import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-applicant',
  templateUrl: './manage-applicant.component.html',
  styleUrls: ['./manage-applicant.component.css']
})
export class ManageApplicantComponent implements OnInit {

  public error:any=[]
  public applicants:any=[]
  searchText:any
  data:any
  imagePath:any='http://127.0.0.1:8000/storage/applicant/';
    constructor(private user:UserServiceService,
      private notify:SnotifyService,
      private router:Router) { }

    ngOnInit(): void {
      this.showJob()
    }

  showJob(){
    this.applicants=this.user.listApplicants().subscribe(res=>{
      this.applicants=res

      console.log('hello' +this.applicants['name'])

      console.log( this.applicants)
      console.log(this.applicants['name'])
    })
  }


  viewUser(id:any){
      this.router.navigate(['/user/viewuser']);
    }
   //this.router.navigateByUrl('/admin/package');


  public form={
    'title':null,
    'role':null,
    'userName':null,
    'email':null,
    'image':null,

  }
}
