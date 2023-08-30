import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeDTO } from "../interfaces/employee";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  id: number = 0;
  employeeForm!: UntypedFormGroup;
  employeeObj!: object;

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const employeeData: EmployeeDTO = {
      firstname: this.employeeForm.controls['firstname'].value,
      lastname: this.employeeForm.controls['lastname'].value,
      email: this.employeeForm.controls['email'].value,
      jobTitle: this.employeeForm.controls['jobTitle'].value,
      department: this.employeeForm.controls['department'].value,
      location: this.employeeForm.controls['location'].value,
    }

    const currentList = localStorage.getItem('employeeList');

    if (currentList !== null) {
      let employeeList = JSON.parse(currentList);
      this.addIdToEmployee(employeeData, employeeList);
      this.saveEmployeeListToLocalStorage(employeeList);
    } else {
      let employeeList: any[] = [];
      this.addIdToEmployee(employeeData);
      this.saveEmployeeListToLocalStorage(employeeList);
    }
    this.route.navigateByUrl('');
  }

  private saveEmployeeListToLocalStorage(employeeList: any) {
    employeeList.push(this.employeeObj);
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
  }

  private addIdToEmployee(employeeData: EmployeeDTO, employeeList?: any) {
    if(employeeList) {
      const itemCount = employeeList.length -1;
      let lastRecordId = employeeList[itemCount].id;
      this.id = lastRecordId + 1;
    } else {
      this.id = 1;
    }
    return this.employeeObj = {...employeeData, id: this.id} as EmployeeDTO;
  }

  private createForm() {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required]
    })
  }
}
