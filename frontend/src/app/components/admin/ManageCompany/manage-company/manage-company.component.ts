import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
  public error:any=[]
  public companys:any=[]
  public approvedCompanys:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,private notify:SnotifyService,private router:Router) { }

    ngOnInit(): void {
      this.showJobs();
      this.showApprovedCompany();
    }

  showJobs(){
    this.companys=this.user.listCompany().subscribe(res=>{
      this.companys=res
      //console.log(this.jobs)
    })
  }

  showApprovedCompany(){
    this.approvedCompanys=this.user.approvedCompany().subscribe(res=>{
      this.approvedCompanys=res
      console.log(this.approvedCompanys);
    })
  }



  deleteCompany(id:any){
    this.user.deleteCompany(id).subscribe((res)=>{
      this.companys=this.companys.filter((a:any)=>a.id==id);
     this.showJobs();
     this.notify.success(res.message,{timeout:3000})
      this.router.navigate(['/admin/admindashboard/manageCompany']);
    });
   //this.router.navigateByUrl('/admin/package');
  }

  public form={
    'email':null,
    'name':null,
    'role':null,
    'description':null,
    'password':null,
    "password_confirmation":null
  }

}
