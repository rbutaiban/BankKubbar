import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);
  
  const isLoggedIn = cookieService.check(authService.userToken);
  if (!isLoggedIn) {
    router.navigate(['/login']);


    return false;
  }
  return true;
};
