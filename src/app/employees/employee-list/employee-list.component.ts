import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  employees!: any[];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getEmployees();
  }

  onDelete(employeeId: number) {
    const url = "http://localhost:4201/api/employee/delete/" + employeeId;
    this.http.delete(url).pipe(take(1)).subscribe((result: any)=>{
      location.reload();
    });
  }

  getEmployees() {
   this.http.get("http://localhost:4201/api/employee")
     .pipe(take(1)).subscribe((result: any)=> {
     this.employees = result.data;
     });
  }
}
