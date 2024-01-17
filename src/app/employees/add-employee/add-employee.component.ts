import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeDTO } from "../../interfaces/employee";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {
  employeeForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private route: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const employeeData: EmployeeDTO = this.employeeForm.value;
    this.employeeService.addEmployee(employeeData).subscribe((result: any)=>{
      console.log("form submitted");
    });
    this.route.navigateByUrl('');
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
