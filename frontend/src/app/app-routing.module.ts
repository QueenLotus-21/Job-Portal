import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSignupComponent } from './components/admin/admin-signup/admin-signup.component';
import { CompanySignupComponent } from './components/company/company-signup/company-signup.component';
import { LoginComponent } from './components/pariots/login/login.component';
import { SignupComponent } from './components/pariots/signup/signup.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'Adminsignup',component:AdminSignupComponent},
  {path:'Companysignup',component:CompanySignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
