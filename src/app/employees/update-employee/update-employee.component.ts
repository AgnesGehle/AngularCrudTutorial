import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeDTO } from "../../interfaces/employee";
import { take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit{
  userId!: number;
  employee!: any[];
  employeeForm!: FormGroup;
  employeeDataFetched = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private route: Router, private http: HttpClient, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployee(this.getUserIdFromRoute()).subscribe((result: any)=> {
      this.employeeDataFetched = true;
      this.employee = result.data;
      this.prepopulateForm();
    });
  }

  getUserIdFromRoute(): number {
    this.activatedRoute.params.subscribe((value) => {
      this.userId = value['id']
    });
    return Number(this.userId);
  }

  onUpdate() {
    const newEmployeeData: EmployeeDTO = this.employeeForm.value;
    this.employeeService.updateEmployee(this.getUserIdFromRoute(), newEmployeeData).subscribe((result: any)=>{
      console.log("updated employee");
    });
    this.route.navigateByUrl('employee-list');
  }

  private prepopulateForm() {
      this.employeeForm = this.fb.group({
        firstname: [this.employee[0].firstname, Validators.required],
        lastname: [this.employee[0].lastname, Validators.required],
        email: [this.employee[0].email, [Validators.required, Validators.email]],
        jobTitle: [this.employee[0].jobTitle, Validators.required],
        department: [this.employee[0].department, Validators.required],
        location: [this.employee[0].location, Validators.required]
      })
  }
}
