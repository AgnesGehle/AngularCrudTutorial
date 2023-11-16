import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeDTO } from "../interfaces/employee";
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get("http://localhost:4201/api/employees");
  }

  getEmployee(employeeId: number) {
    const url = "http://localhost:4201/api/employee/" + employeeId;
    return this.http.get(url);
  }

  addEmployee(employeeData: EmployeeDTO) {
    this.http.post("http://localhost:4201/api/employee/add", employeeData).subscribe((result: any)=>{
      console.log("form submitted");
    });
  }

  updateEmployee(employeeId: number, newEmployeeData: EmployeeDTO) {
    const url = "http://localhost:4201/api/employee/update/" + employeeId;
    this.http.put(url, newEmployeeData).subscribe((result: any)=>{
      console.log("updated employee");
    });
  }

  deleteEmployee(employeeId: number) {
    const url = "http://localhost:4201/api/employee/delete/" + employeeId;
    this.http.delete(url).subscribe((result: any)=>{
      location.reload();
    });
  }
}
