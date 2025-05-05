import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BankCardComponent } from '../../../components/bank-card/bank-card.component';
import { TransactionsComponent } from '../../transactions/transactions/transactions.component';
import { UserComponent } from '../../../components/user/user.component';
import { LoaderComponent } from '../../../components/ui/loader/loader.component';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BankCardComponent,
    TransactionsComponent,

    UserComponent,
    LoaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user = signal<User | null>(null);
  amount = computed(() => Number(this.user()?.balance) || 0);
  loading = false;

  constructor(private userService: UserService) {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.loading = true;
        this.user.set(user);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
