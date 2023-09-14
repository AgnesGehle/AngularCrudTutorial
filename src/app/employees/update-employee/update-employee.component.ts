import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { EmployeeDTO } from "../interfaces/employee";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {
  userId!: number;
  employees!: any[];
  employeeForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router) {
    this.getEmployeesFromLocalStorage();
    this.prepopulateForm();
  }

  getEmployeesFromLocalStorage() {
    const employeeList = localStorage.getItem('employeeList');

    if(employeeList !== null) {
      this.employees = JSON.parse(employeeList);
    }
  }

  getUserIdFromRoute(): number {
    this.activatedRoute.params.subscribe((value) => {
      this.userId = value['id']
    });
    return Number(this.userId);
  }

  prepopulateForm() {
      const currentEmployee = this.employees.find((m: any) => m.id == this.getUserIdFromRoute())
      if(currentEmployee) {
        this.employeeForm = this.fb.group({
          firstname: [currentEmployee.firstname, Validators.required],
          lastname: [currentEmployee.lastname, Validators.required],
          email: [currentEmployee.email, [Validators.required, Validators.email]],
          jobTitle: [currentEmployee.jobTitle, Validators.required],
          department: [currentEmployee.department, Validators.required],
          location: [currentEmployee.location, Validators.required]
        })
      }
  }

  onChange() {
    const newEmployeeData: EmployeeDTO = this.employeeForm.value;

    let newEmployeeList = this.employees.map((employeeData) => {
      if (employeeData.id === this.getUserIdFromRoute()) {
        return {
          ...employeeData,
          ...newEmployeeData,
        };
      }
      return employeeData;
    });
    localStorage.setItem('employeeList', JSON.stringify(newEmployeeList));
    this.route.navigateByUrl('');
  }
}
