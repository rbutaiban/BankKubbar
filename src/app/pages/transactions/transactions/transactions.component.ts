import { Component, effect, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { Transaction } from '../../../interfaces/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactionsService = inject(TransactionService);
  transactions$ = this.transactionsService.myTransactions$;

  ngOnInit() {
    if (!this.transactionsService.myTransactions().length) {
      this.transactionsService.getMyTransactions().subscribe();
    }
  }
}
