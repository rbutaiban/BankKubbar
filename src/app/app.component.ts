import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BankKubbar';
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userService.users.set(res);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
