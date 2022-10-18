import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/pariots/login/login.component';
import { SignupPageComponent } from './components/pariots/signup-page/signup-page.component';
import { SignupComponent } from './components/pariots/signup/signup.component';


//guards
import { AdminAuthGuard } from './Guard/admin-auth.guard';
import {CompanyAuthGuard} from './Guard/company-auth.guard';
import {SuperadminGuard} from './Guard/superadmin.guard';
import {UserAuthGuard} from './Guard/user-auth.guard';
import {AuthGuard} from './Guard/auth.guard';

//admin
import { AdminSignupComponent } from './components/admin/admin-signup/admin-signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminavComponent } from './components/admin/adminav/adminav.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { ManageAdminComponent } from './components/admin/manageAdmin/manage-admin/manage-admin.component';
import { RegisterAdminComponent } from './components/admin/ManageAdmin/register-admin/register-admin.component';
import { UpdateadminComponent } from './components/admin/ManageAdmin/updateadmin/updateadmin.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { UpdateUserComponent } from './components/admin/update-user/update-user.component';

//company
import { CompanySignupComponent } from './components/company/company-signup/company-signup.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanynavComponent } from './components/company/companynav/companynav.component';
import { PostJobComponent } from './components/company/post-job/post-job.component';
import { ManageApplicantComponent } from './components/company/manage-applicant/manage-applicant.component';

//user
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import {UserNavComponent} from './components/user/user-nav/user-nav.component';
import { UserComponent } from './components/user/user.component';
import {UserhomeComponent} from './components/user/userhome/userhome.component';
import { JobListComponent } from './components/user/job-list/job-list.component';
import { ViewJobComponent } from './components/user/manageJob/view-job/view-job.component';
import { ApplicantComponent } from './components/user/manageJob/applicant/applicant.component';



import { ManageJobComponent } from './components/company/manage-job/manage-job.component';
import { UpdateJobComponent } from './components/company/Manage-job/update-job/update-job.component';

//password
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ChangePasswordComponent } from './components/password/change-password/change-password.component';
import { RegisterCompanyComponent } from './components/admin/ManageCompany/register-company/register-company.component';
import { ManageCompanyComponent } from './components/admin/ManageCompany/manage-company/manage-company.component';
import { UpdateCompanyComponent } from './components/admin/ManageCompany/update-company/update-company.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'Adminsignup',component:AdminSignupComponent},
  {path:'Companysignup',component:CompanySignupComponent},
  {path:'signupPage',component:SignupPageComponent},
  {path:'request-reset',component:RequestResetComponent},
  {path:'responseReset',component:ResponseResetComponent},
  {path:'changePassword',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'',component:UserhomeComponent},

  {path:'user',component:UserComponent,
  children:[
    {path:'userhome',component:UserhomeComponent},
    {path:'usernav',component:UserNavComponent},
    {path:'joblist',component:JobListComponent},
    {path:'viewjob/:jobId',component:ViewJobComponent},
    {path:'applicant/:jobID',component:ApplicantComponent},
  ],canActivate:[UserAuthGuard],
  },


  {path:'admin',component:AdminComponent,
  children:[
    {path:'',component:HomeComponent},
    {path:'Adminav',component:AdminavComponent},
    {path:'Adminhome',component:HomeComponent},
    {path:'Adminheader',component:HeaderComponent},
    {path:'Adminsidenav',component:SidenavComponent},
    {path:'Admindashboard',component:DashboardComponent},

    //manage user
    {path:'adduser',component:AddUserComponent},
    {path:'editUser/:userId',component:UpdateUserComponent,canActivate:[SuperadminGuard]},
    {path:'manageuser',component:ManageUserComponent},

    //manage company
    {path:'registercompany',component:RegisterCompanyComponent},
    {path:'manageCompany',component:ManageCompanyComponent},
    {path:'editCompany/:companyId',component:UpdateCompanyComponent},
    //manage Admin

    {path:'editAdmin/:adminId',component:UpdateadminComponent},
     {path:'registerAdmin',component:RegisterAdminComponent},
    {path:'manageAdmin',component:ManageAdminComponent},

  ],canActivate:[AdminAuthGuard]
  },

  //manage company
  {path:'company',component:CompanyComponent,
  children:[
    {path:'companynav',component:CompanynavComponent},
    {path:'postjob',component:PostJobComponent},
    {path:'managePost',component:ManageJobComponent},
    {path:'updatejob/:jobsId',component:UpdateJobComponent},
    {path:'applicantdetail',component:ManageApplicantComponent},

  ],canActivate:[CompanyAuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
