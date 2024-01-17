import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeDTO } from "../interfaces/employee";
import { API_URL } from "../utils/constants";

const apiUrl = API_URL;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(apiUrl + "employees");
  }

  getEmployee(employeeId: number) {
    const url = apiUrl + "employee/" + employeeId;
    return this.http.get(url);
  }

  addEmployee(employeeData: EmployeeDTO) {
    return this.http.post(apiUrl + "employee/add", employeeData);
  }

  updateEmployee(employeeId: number, newEmployeeData: EmployeeDTO) {
    const url = apiUrl + "employee/update/" + employeeId;
    return this.http.put(url, newEmployeeData);
  }

  deleteEmployee(employeeId: number) {
    const url = apiUrl + "employee/delete/" + employeeId;
    return this.http.delete(url);
  }
}
