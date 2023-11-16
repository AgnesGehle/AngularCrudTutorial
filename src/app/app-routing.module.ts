import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employees/employee-list/employee-list.component";
import {AddEmployeeComponent} from "./employees/add-employee/add-employee.component";
import {UpdateEmployeeComponent} from "./employees/update-employee/update-employee.component";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {path: '', component: EmployeeListComponent},
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
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
export class AppRoutingModule { }
