import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BankKubbar';
  userName: string = "";
  userLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){
    this.userLoggedIn = this.authService.isLoggedIn();
    this.userName = authService.getLoggedInUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
