import { Component, OnInit, effect } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'BankKubbar';
  userName: string = '';
  userLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.userLoggedIn = this.authService.isLoggedIn$();
    this.userName = authService.getLoggedInUser();

    // Create an effect to react to auth state changes
    effect(() => {
      const isLoggedIn = this.authService.isLoggedIn$();
      this.userLoggedIn = isLoggedIn;
      if (isLoggedIn && !this.userService.user()) {
        this.userService.getProfile().subscribe();
      }
    });
  }

  ngOnInit() {
    // No need for subscription here since we're using effect
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
