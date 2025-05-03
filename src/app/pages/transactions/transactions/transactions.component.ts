import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { DataTableComponent } from '../../../components/ui/data-table/data-table.component';
import { UserService } from '../../../services/user.service';
import { TransactionData } from '../../../interfaces/transaction';
import { ButtonComponent } from "../../../components/ui/button/button.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [DataTableComponent, ButtonComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactionsService = inject(TransactionService);
  usersService = inject(UserService);

  transactionsData: TransactionData[] = [];
  loading = false;

  ngOnInit() {
    this.transactionsService.getMyTransactions().subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.transactionsData = results.map((result) => ({
            id: result._id,
            type: result.type,
            amount: result.amount,
            from: result.from,
            to: result.to,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          }));
        }
      },
      error: (error) => {
        console.error('Error processing enhanced data:', error);
      },
    });
  }
}
