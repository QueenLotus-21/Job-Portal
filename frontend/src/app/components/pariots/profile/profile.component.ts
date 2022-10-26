import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imagePath:any='http://127.0.0.1:8000/storage/applicant/';
  public error:any=[]
  public users:any=[]
  searchText:any
  data:any
    constructor(private user:UserServiceService,
      private notify:SnotifyService,
      private router:Router) { }

    ngOnInit(): void {
      this.showUsers()
    }

  showUsers(){
    this.users=this.user.getUserProfile().subscribe(res=>{
      this.users=res
      console.log('hello tig' +this.users)
    })
  }

  public form={
    'email':null,
    'name':null,
    'role':null,
    'approved':null,
    'password':null,
    "password_confirmation":null
  }

}
