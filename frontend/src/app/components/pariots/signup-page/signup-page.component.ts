import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displaySignup(){
    let signupform=document.querySelector('.signup-form');
    signupform.classList.add('active');
  }
  signupClose(){
    let loginForm=document.querySelector('.signup-form');
    loginForm.classList.remove('active');
   }
}
