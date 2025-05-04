import { Component, OnInit, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = signal<User | null>(null);

  constructor(private userService: UserService) {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
