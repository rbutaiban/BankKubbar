import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn$;

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
