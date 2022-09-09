import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';

import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() togleSidebarforMe:EventEmitter<any>=new EventEmitter();
  constructor(private auth:AuthserviceService,private router:Router,private user:UserServiceService) { }

  ngOnInit(): void {
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
