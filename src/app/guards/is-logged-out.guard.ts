import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const isLoggedIn = cookieService.check(authService.userToken);

  if (isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
