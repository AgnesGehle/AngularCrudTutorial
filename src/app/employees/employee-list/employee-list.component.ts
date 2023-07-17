import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  employees: object[] = [];
  ngOnInit() {
    this.getEmployeesFromLS();
  }

  onChange(employee: object) {
    console.log(employee);
  }

  onDelete(employeeId: number, employees: any[]) {
    for (let i = 0; i < employees.length; i++) {
      if(employees[i].id === employeeId) {
        employees.splice(i, 1);
      }
    }
    localStorage.setItem('employeeList', JSON.stringify(employees));
  }

  getEmployeesFromLS() {
    const employeeList = localStorage.getItem('employeeList');

    if(employeeList !== null) {
      this.employees = JSON.parse(employeeList);
    }
  }
}
