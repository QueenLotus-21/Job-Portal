import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PariotsComponent } from './components/pariots/pariots.component';
import { LoginComponent } from './components/pariots/login/login.component';
import { SignupComponent } from './components/pariots/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AdminSignupComponent } from './components/admin/admin-signup/admin-signup.component';
import { CompanySignupComponent } from './components/company/company-signup/company-signup.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PariotsComponent,
    LoginComponent,
    SignupComponent,
    AdminSignupComponent,
    CompanySignupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule

  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
