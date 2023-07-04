import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  addEmployeeForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    jobTitle: ['', Validators.required],
    department: ['', Validators.required],
    location: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private route: Router) {}

  onSubmit(): void {
    let currentList = localStorage.getItem('employeeList');
    if (currentList !== null) {
      let employeeList = JSON.parse(currentList);
      employeeList.push(this.addEmployeeForm.value);
      localStorage.setItem('employeeList', JSON.stringify(employeeList));
    } else {
      let employeeArr = [];
      employeeArr.push(this.addEmployeeForm.value)
      return localStorage.setItem('employeeList', JSON.stringify(employeeArr));
    }
    this.route.navigateByUrl('');
  }
}
