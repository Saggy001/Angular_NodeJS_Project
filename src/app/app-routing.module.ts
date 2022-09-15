import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './AuthGuard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginGuard } from './LoginGuard';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportComponent } from './components/report/report.component';
import { AboutComponent } from './components/about/about.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes : Routes =[
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '', 
    component: FirstPageComponent ,
    children: [
      { path: 'signin',canActivate: [LoginGuard],  component: LoginComponent },
      { path: 'signup', canActivate: [LoginGuard], component: RegisterComponent },
      { path: 'forget-password', canActivate: [LoginGuard], component: ForgetPasswordComponent},
      { path: 'reset/:token', canActivate: [LoginGuard], component: ResetPasswordComponent }
    ]
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'users', canActivate: [AuthGuard], component: UsersComponent},
      { path: 'category', canActivate: [AuthGuard], component: CategoryComponent},
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
      { path: 'report', canActivate: [AuthGuard], component: ReportComponent},
      { path: 'about', canActivate: [AuthGuard], component: AboutComponent},
      { path: 'updateUser/:id',canActivate: [AuthGuard], component: AddUserComponent },
      { path: 'addUser', component: AddUserComponent },
      { path: '', canActivate: [AuthGuard], component: DashboardComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [FirstPageComponent,
                                  LoginComponent,
                                  RegisterComponent,
                                  HomeComponent]
