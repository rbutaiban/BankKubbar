import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { map } from 'rxjs';
import { BankCardComponent } from '../../../components/bank-card/bank-card.component';

import { AsyncPipe } from '@angular/common';
import { TransactionsComponent } from '../../transactions/transactions/transactions.component';
import { UserComponent } from "../../../components/user/user.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BankCardComponent, TransactionsComponent, AsyncPipe, UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userService = inject(UserService);
  user$ = this.userService.user$;
  amount = this.user$.pipe(map((user) => Number(user?.balance) || 0));
  ngOnInit(): void {
    this.userService.getProfile().subscribe();
  }
}
