import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private auth:AuthserviceService,
    private router:Router,
    private user:UserServiceService) { }
    @Output() togleSidebarforMe:EventEmitter<any>=new EventEmitter();
    username:any;
    ngOnInit(): void {
      //this.showUserName();
    }
    toggleSidebar(){
     this.togleSidebarforMe.emit();
    }

  logout(event:MouseEvent){
    event.preventDefault()
    this.auth.chageAuthStatus(false);
    localStorage.removeItem('');
   // this.user.updateMenu.next();
   this.router.navigateByUrl('/login');
  }
}
