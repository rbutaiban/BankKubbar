import { Component, inject } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions/transactions.component';
import { BankCardComponent } from '../../components/bank-card/bank-card.component';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
}
