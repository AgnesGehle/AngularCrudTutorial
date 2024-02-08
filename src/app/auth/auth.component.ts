import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  registrationForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    console.log(this.registrationForm);
  }

  onSwitchMode( ){
    this.isLoginMode = !this.isLoginMode;
  }

  private createForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

}
