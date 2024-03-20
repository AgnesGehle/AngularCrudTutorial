import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employees/employee-list/employee-list.component";
import {AddEmployeeComponent} from "./employees/add-employee/add-employee.component";
import {UpdateEmployeeComponent} from "./employees/update-employee/update-employee.component";
import { LoginComponent } from "./public/login/login.component";
import { RegisterComponent } from "./public/register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'employee-list', component: EmployeeListComponent, canActivate: [authGuard]},
  {path: 'add-employee', component: AddEmployeeComponent, canActivate: [authGuard]},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [authGuard]},
  {path: '', redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
