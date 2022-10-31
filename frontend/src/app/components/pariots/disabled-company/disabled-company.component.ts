import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-disabled-company',
  templateUrl: './disabled-company.component.html',
  styleUrls: ['./disabled-company.component.css']
})
export class DisabledCompanyComponent implements OnInit {

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
