import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(translate: TranslateService, private authService: AuthService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  get isLoggedIn() {
    const token = localStorage.getItem('token');
   /* this.authService.checkTokenValidity(token).subscribe(response => {
      console.log("subscription response: " + response.status + " " + response.valid + " " + response.message);
      return response.valid;
    });*/
    return false;
  }
}
