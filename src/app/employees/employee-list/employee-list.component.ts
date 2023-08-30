import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  employees!: any[];
  ngOnInit() {
    this.getEmployeesFromLocalStorage();
  }

  onDelete(employeeId: number, employees: any[]) {
    for (let i = 0; i < employees.length; i++) {
      if(employees[i].id === employeeId) {
        employees.splice(i, 1);
      }
    }
    localStorage.setItem('employeeList', JSON.stringify(employees));
  }

  getEmployeesFromLocalStorage() {
    const employeeList = localStorage.getItem('employeeList');

    if(employeeList !== null) {
      this.employees = JSON.parse(employeeList);
    }
  }
}
