import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserComponent } from '../user/user.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, UserComponent, AsyncPipe],
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
    this.router.navigate(['/login']);
  }
}
