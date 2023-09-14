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
  employeeForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const employeeData: EmployeeDTO = this.employeeForm.value;
    const newEmployee = this.addIdToEmployee(employeeData);
    this.saveEmployeeListToLocalStorage(newEmployee);

    this.route.navigateByUrl('');
  }

  private saveEmployeeListToLocalStorage(newEmployee: EmployeeDTO) {
    const currentList = localStorage.getItem('employeeList');
    let employeeList:EmployeeDTO[] = [];
    if (currentList) {
        employeeList = JSON.parse(currentList);
    }
    employeeList.push(newEmployee);
    localStorage.setItem('employeeList', JSON.stringify(employeeList));
  }

  private addIdToEmployee(employeeData: EmployeeDTO) {
    const currentList = localStorage.getItem('employeeList');
    let id = 1;

    if(currentList) {
      let employeeList = JSON.parse(currentList)
      const itemCount = employeeList.length -1;
      let lastRecordId = employeeList[itemCount].id;
      id = lastRecordId + 1;
    }

    return {...employeeData, id: id} as EmployeeDTO;
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
