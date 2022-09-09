import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-companynav',
  templateUrl: './companynav.component.html',
  styleUrls: ['./companynav.component.css']
})
export class CompanynavComponent implements OnInit {
  constructor(private auth:AuthserviceService,private router:Router) { }

  ngOnInit(): void {
  }


  logout(event:MouseEvent){
    event.preventDefault()
    this.auth.chageAuthStatus(false);
    localStorage.removeItem('');
   this.router.navigateByUrl('/login');
  }
}
