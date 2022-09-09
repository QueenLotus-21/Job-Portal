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
  superdisplay=false;
  displayMenu=false;
  diplayPackege1=false;
  diplayUser=false;
  currentRole:any;
  constructor(private auth:AuthserviceService,private router:Router,private user:UserServiceService) { }

  public loggedIn:boolean;
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=> this.loggedIn = value);
    this.user.updateMenu.subscribe(res=>{
      this.superMenuDisplay();
    })
    this.user.updateMenuAdmin.subscribe(res=>{
      this.superMenuDisplay();
    })

    this.superMenuDisplay();
  }


  ngDoCheck(): void{
    if(this.router.url=='/login'){
      this.diplayPackege1=false;
      this.diplayUser=false;
      this.superMenu=true;
    }
    else if(this.router.url=='/admin'){
      this.diplayUser=false;
      this.superMenu=false;
    }

    else{
      this.displayMenu=true;

    }
    }

    superMenuDisplay(){
      if(this.user.getToken!=null){
        this.currentRole=this.user.getRole();
        if(this.currentRole=="admin"){
          this.router.navigateByUrl('/admin');
        }
      }
    }

  logout(event:MouseEvent){
    event.preventDefault()
    this.auth.chageAuthStatus(false);
    localStorage.removeItem('');
   this.router.navigateByUrl('/login');
  }

}
