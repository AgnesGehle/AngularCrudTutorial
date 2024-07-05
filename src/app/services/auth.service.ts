import { Injectable } from '@angular/core';
import { TokenResponse } from "../interfaces/tokenResponse";
import { API_URL } from "../utils/constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkTokenValidity(token: string | null) {
    return this.http.post<TokenResponse>(API_URL + "get-token", token);
  }
}
