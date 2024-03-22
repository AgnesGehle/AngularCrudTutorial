import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { LoginUserModelDTO } from "../interfaces/loginUserModel";
import { Response } from "../interfaces/response";
import { API_URL } from "../utils/constants";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

const apiUrl = API_URL;

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  isLoggedIn = false;
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService
  ) {}

  login(loginData: LoginUserModelDTO) {
    return this.http.post<Response>(apiUrl + "login", loginData);
  }

  loginSuccess() {
    this.router.navigate(['dashboard']);
    this.generateAndStoreAccessToken();
    this.isLoggedIn = true;
  }

  loginFail() {
    this.messageService.add({severity: 'error', summary: 'Fehler', detail:this.translateService.instant('login.failed_message')});
  }

  logout(): void {
    this.router.navigate(['/login'])
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  private generateAndStoreAccessToken() {
      let currentDate = new Date();
      let token = currentDate.setHours(currentDate.getHours() + 4);
      localStorage.setItem('token', token.toString());
  }
}
