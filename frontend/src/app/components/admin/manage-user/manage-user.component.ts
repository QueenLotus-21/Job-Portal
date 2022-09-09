import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  public error:any=[]
  public users:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,private notify:SnotifyService,private router:Router) { }

    ngOnInit(): void {
      this.showUsers()
    }

  showUsers(){
    this.users=this.user.listUsers().subscribe(res=>{
      this.users=res
      console.log(this.users)
    })
  }


  deleteUser(id:any){
    this.user.deleteUser(id).subscribe((res)=>{
      this.users=this.users.filter((a:any)=>a.id==id);
     this.showUsers();
     this.notify.success(res.message,{timeout:3000})
      this.router.navigate(['/admin/admindashboard/manageUser']);
    });
   //this.router.navigateByUrl('/admin/package');
  }

  public form={
    'email':null,
    'name':null,
    'role':null,
    'approved':null,
    'password':null,
    "password_confirmation":null
  }
  onSubmit(){
    console.log(this.form);
    this.user.registerUser(this.form).subscribe(res=>{
     this.data=res
    },
    error=>{
      this.error=error
    },

    )
  }

}
