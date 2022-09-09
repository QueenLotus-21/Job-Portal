import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminav',
  templateUrl: './adminav.component.html',
  styleUrls: ['./adminav.component.css']
})
export class AdminavComponent implements OnInit {


  sideBarOpen=true
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }


}
