import { Component, OnInit, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { TransactionsFormComponent } from '../transactions-form/transactions-form.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TransactionsFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = signal<User | null>(null);

  constructor(private userService: UserService) {
    this.refreshUserProfile();
  }

  refreshUserProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onTransactionSubmitted() {
    this.refreshUserProfile();
  }
}
