import { HttpClient } from "@angular/common/http";
import { API_URL } from "../utils/constants";
import { Injectable } from "@angular/core";
import { LoginUserModelDTO } from "../interfaces/loginUserModel";
import { Response } from "../interfaces/response";
import { Router } from "@angular/router";

const apiUrl = API_URL;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(loginData: LoginUserModelDTO) {
    this.isLoggedIn = true;
    return this.http.post<Response>(apiUrl + "login", loginData);
  }
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
    localStorage.removeItem('token');
  }

}
