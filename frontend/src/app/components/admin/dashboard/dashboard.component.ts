import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  applicants:any;
  constructor(private user:UserServiceService) { }

  ngOnInit(): void {
    this. showJob();
  }


  showJob(){
    this.applicants=this.user.listApplicants().subscribe(res=>{
      this.applicants=res

      console.log('hello' +this.applicants['name'])

      console.log( this.applicants)

    })
  }
}
