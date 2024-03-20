import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) {}

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
        this.authService.logout();
    }
}
