import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeDTO } from "../../interfaces/employee";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit{
  employees!: EmployeeDTO[];

  constructor(private http: HttpClient, private employeeService: EmployeeService) {}
  ngOnInit() {
   this.fetchEmployeeData();
  }

  onDelete(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe();
    this.fetchEmployeeData();
  }

  fetchEmployeeData() {
    this.employeeService.getEmployees().subscribe((result: any) => {
      this.employees = result.data;
    })
  }
}
