import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
        {
          label: 'Registrieren',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'auth'
        },
        {
          label: 'Mitarbeiter Hinzufügen',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'add-employee'
        },
      ];
    }
}
