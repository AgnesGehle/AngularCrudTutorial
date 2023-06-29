import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

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
  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.addEmployeeForm);
  }
}
