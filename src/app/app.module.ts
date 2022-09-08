import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClarityModule } from '@clr/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent,
    DeleteDialogComponent,
    ProfileComponent,
    NoAccessComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'',component:DashboardComponent},
      {path:'employees',component:EmployeesComponent,canActivate:[AuthGuard]},
      {path:'login',component:LoginComponent},
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]}
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://localhost:8080/login"],
      }})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
