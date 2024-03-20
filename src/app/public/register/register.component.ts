import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserDTO } from "../../interfaces/user";
import { passwordMatchValidator } from "../../shared/password-match.directive";
import { MessageService } from "primeng/api";
import { RegisterService } from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private registerService: RegisterService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();

  }

  onRegister() {
    const postData = {... this.registerForm.value};
    delete postData.confirmPassword;

    this.registerService.register(postData as UserDTO).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Erfolg', detail:'Registrierung war erfolgreich.'});
        this.router.navigate(['login']);
      },
    error => {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail:'Registrierung ist fehlgeschlagen.'});
    });
  }

  private createForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: passwordMatchValidator
    })
  }

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  get lastname() {
    return this.registerForm.controls['lastname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
