import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PariotsComponent } from './components/pariots/pariots.component';
import { LoginComponent } from './components/pariots/login/login.component';
import { SignupComponent } from './components/pariots/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AdminSignupComponent } from './components/admin/admin-signup/admin-signup.component';
import { CompanySignupComponent } from './components/company/company-signup/company-signup.component';
import { UserhomeComponent } from './components/user/userhome/userhome.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import { CompanynavComponent } from './components/company/companynav/companynav.component';
import { AdminavComponent } from './components/admin/adminav/adminav.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HomeComponent } from './components/admin/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { UpdateUserComponent } from './components/admin/update-user/update-user.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { ManageAdminComponent } from './components/admin/manageAdmin/manage-admin/manage-admin.component';
import { UpdateadminComponent } from './components/admin/ManageAdmin/updateadmin/updateadmin.component';
import { RegisterAdminComponent } from './components/admin/ManageAdmin/register-admin/register-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PariotsComponent,
    LoginComponent,
    SignupComponent,
    AdminSignupComponent,
    CompanySignupComponent,
    UserhomeComponent,
    UserNavComponent,
    CompanynavComponent,
    AdminavComponent,
    AdminComponent,
    UserComponent,
    CompanyComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    HomeComponent,
    ManageUserComponent,
    UpdateUserComponent,
    AddUserComponent,
    ManageAdminComponent,
    UpdateadminComponent,
    RegisterAdminComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SnotifyModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule

  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
