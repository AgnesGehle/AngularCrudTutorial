import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUserModelDTO } from "../../interfaces/loginUserModel";
import { LoginService } from "../../services/login.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    const loginData: LoginUserModelDTO = this.loginForm.value;
    this.loginService.login(loginData).subscribe(
      response => {
        if(response.access) {
          this.loginService.storeToken(response.tokenData).subscribe(
            tokenResponse=> {
              console.log(tokenResponse);
          });
          this.loginService.loginSuccess();
        } else {
          this.loginService.loginFail();
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail:error});
      }
    );
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
