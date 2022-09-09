import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
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
import { CompanySignupComponent } from './components/company/company-signup/company-signup.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanynavComponent } from './components/company/companynav/companynav.component';
import { LoginComponent } from './components/pariots/login/login.component';
import { SignupComponent } from './components/pariots/signup/signup.component';
import {UserNavComponent} from './components/user/user-nav/user-nav.component';
import { UserComponent } from './components/user/user.component';
import {UserhomeComponent} from './components/user/userhome/userhome.component'


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},


  {path:'user',component:UserComponent,
  children:[
    {path:'userhome',component:UserhomeComponent},
    {path:'usernav',component:UserNavComponent},
  ]
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
    {path:'editUser/:userId',component:UpdateUserComponent},
    {path:'manageuser',component:ManageUserComponent},

    //manage Admin
    {path:'Adminsignup',component:AdminSignupComponent},
    {path:'editAdmin/:adminId',component:UpdateadminComponent},
     {path:'registerAdmin',component:RegisterAdminComponent},
    {path:'manageAdmin',component:ManageAdminComponent},

  ]
  },

  {path:'company',component:CompanyComponent,
  children:[
    {path:'companynav',component:CompanynavComponent},
    {path:'Companysignup',component:CompanySignupComponent},

  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
