import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  loginSuccess() {
    this.router.navigate(['dashboard']);
    this.generateAndStoreAccessToken();
  }

  loginFail() {
    this.messageService.add({severity: 'error', summary: 'Fehler', detail:'Passwort oder E-Mail stimmen nicht.'});
  }
  private generateAndStoreAccessToken() {
      let currentDate = new Date();
      let token = currentDate.setHours(currentDate.getHours() + 4);
      localStorage.setItem('token', token.toString());
  }
}
