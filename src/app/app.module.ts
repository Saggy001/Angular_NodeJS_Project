import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertUserComponent } from './components/alert-user/alert-user.component';
import { Sibling1Component } from './components/sibling1/sibling1.component';
import { Sibling2Component } from './components/sibling2/sibling2.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UniversalAppInterceptor } from './UniversalInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ReportComponent } from './components/report/report.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
@NgModule({
  
  declarations: [
    AppComponent,
    AlertUserComponent,
    Sibling1Component,
    Sibling2Component,
    NavBarComponent,
    SideBarComponent,
    UsersComponent,
    AddUserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FirstPageComponent,
    ForgetPasswordComponent,
    CategoryComponent,
    DashboardComponent,
    ProfileComponent,
    AboutComponent,
    ReportComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
