import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {
  superMenu=true
  displayAll=true
  superdisplay=false;
  displayMenu=false;
  diplayPackege1=false;
  diplayUser=false;
  displayCompany:any;
  currentRole:any;
  currentEmail:any
  currentName:any;
  displayUsername=true;
  public username:any;
  imagePath:any='http://127.0.0.1:8000/storage/applicant/';
  constructor(private auth:AuthserviceService,private router:Router,private user:UserServiceService) { }

  public loggedIn:boolean;
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=> this.loggedIn = value);
    this.user.updateMenu.subscribe(res=>{
      this.superMenuDisplay();
      this.showUserName();
     this.menuDisplay();
    })
    this.user.updateMenuAdmin.subscribe(res=>{
      this.superMenuDisplay();

    })

    this.superMenuDisplay();
   this.showUserName();
   this.menuDisplay();
  }

  showUserName(){
    this.username=this.user.getUserProfile().subscribe(res=>{
      this.username=res;
      // this.username=this.user.getUserName();
      console.log(this.username)
    })
   //return this.username=this.user.getUserName();

  }

  ngDoCheck(): void{
    if(this.router.url=='/login'){
      this.diplayPackege1=false;
      this.diplayUser=false;
      this.superMenu=true;
      this.displayCompany=false;
      this.displayUsername=false;
    }
    else if(this.router.url=='/admin'){
      this.diplayUser=false;
      this.superMenu=false;
    }
    else if(this.router.url=='/company/companynav'){
      this.displayAll=false;
    }

    else{
      this.displayMenu=true;
      this.displayUsername=true;
    }
    }

    //display only by role
    menuDisplay(){
      if(this.user.getToken!=null){
        //this.currentRole=this.user.getRolebyToken(this.user.getToken());
        this.currentRole=this.user.getRole();
        this.currentEmail=this.user.getEmail();
        // this.currentEmail=this.user.getEmail();
        this.currentName=this.user.getName();
       // this.displayCompany=(this.currentRole=='admin' || this.currentRole=="superadmin")
      this.displayCompany=(this.currentRole=='company')
      //this.superdisplay=(this.currentRole=="user"||this.currentRole=="admin")
      // console.log('hello tig'+this.currentRole+this.currentEmail+this.currentName)
     }
    }



    superMenuDisplay(){
      if(this.user.getToken!=null){
        this.currentRole=this.user.getRole();
        if(this.currentRole=="admin"|| this.currentRole=="superadmin"){
          this.router.navigateByUrl('/admin');
        }
      }
    }

    displayLogin(){
      let loginform=document.querySelector('.login-form');
      loginform.classList.add('active');
    }

  logout(event:MouseEvent){
    event.preventDefault()
    this.auth.chageAuthStatus(false);
    localStorage.removeItem('');
   this.router.navigateByUrl('/login');
  }

}
