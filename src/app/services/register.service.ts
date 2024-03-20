import { Injectable } from "@angular/core";
import { API_URL } from "../utils/constants";
import { UserDTO } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";

const apiUrl = API_URL;

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(private http: HttpClient) {}
  register(userData: UserDTO){
    return this.http.post(apiUrl + "user/add", userData);
  }
}
