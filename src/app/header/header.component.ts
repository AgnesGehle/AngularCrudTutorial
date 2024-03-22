import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
      this.items = [
        {
          label: 'Mitarbeiter-Liste',
          icon: 'pi pi-fw pi-list',
          routerLink: 'employee-list'
        },
        {
          label: 'Mitarbeiter Hinzufügen',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'add-employee'
        },
      ];
    }

    logout() {
        this.loginService.logout();
    }
}
