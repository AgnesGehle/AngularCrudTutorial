import { inject} from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem("token");

  authService.checkTokenValidity(token).subscribe(response => {
    console.log("subscription response: " + response.status + " " + response.valid + " " + response.message);
    if(response.valid) {
      return true;
    }

    router.navigate(['login']);
    return false;
  });

  router.navigate(['login']);
  return false;
};
