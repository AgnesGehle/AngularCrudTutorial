import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  employees = [];
  ngOnInit() {
    let  employeeList = localStorage.getItem('employeeList')

    if(employeeList !== null) {
       return this.employees = JSON.parse(employeeList);
    }
  }

}
