import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {

  public error:any=[]
  public admins:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,private notify:SnotifyService,private router:Router) { }

    ngOnInit(): void {
      this.showAdmin()
    }

    showAdmin(){
    this.admins=this.user.listAdmin().subscribe(res=>{
      this.admins=res
      //console.log(this.admins)
    })
  }


  deleteAdmin(id:any){
    this.user.deleteAdmin(id).subscribe((res)=>{
      this.admins=this.admins.filter((a:any)=>a.id==id);
     this.showAdmin();
     this.notify.success(res.message,{timeout:3000})
      this.router.navigate(['/admin/manageAdmin']);
    });
   //this.router.navigateByUrl('/admin/package');
  }

  public form={
    'email':null,
    'name':null,
    'role':null,
    'gender':null,
    'password':null,
    "password_confirmation":null
  }
  onSubmit(){
    console.log(this.form);
    this.user.registerAdmin(this.form).subscribe(res=>{
     this.data=res
    },
    error=>{
      this.error=error
    },

    )
  }

}
