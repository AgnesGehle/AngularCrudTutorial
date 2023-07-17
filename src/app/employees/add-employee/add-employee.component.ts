import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Employee } from "../employee";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  id: number = 0;
  employeeData: object = {};

  employeeForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', Validators.required],
    department: ['', Validators.required],
    location: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private route: Router) {}

  onSubmit(): void {
    const currentList = localStorage.getItem('employeeList');
    if (currentList !== null) {
      let employeeList = JSON.parse(currentList);
      this.employeeData = this.addIdToEmployee(this.employeeForm.value,employeeList);
      employeeList.push(this.employeeData);
      localStorage.setItem('employeeList', JSON.stringify(employeeList));
    } else {
      let employeeList: any[] = [];
      this.employeeData = this.addIdToEmployee(this.employeeForm.value);
      employeeList.push(this.employeeData);
      localStorage.setItem('employeeList', JSON.stringify(employeeList));
    }
    this.route.navigateByUrl('');
  }

  addIdToEmployee(employee: object, employeeList?: any[]) {
    if(employeeList) {
      const itemCount = employeeList.length -1;
      let lastRecordId = employeeList[itemCount].id;
      this.id = lastRecordId + 1;
    } else {
      this.id = 1;
    }
    return this.employeeData = {...employee, id: this.id} as Employee;
  }
}
