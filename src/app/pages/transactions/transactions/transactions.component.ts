import { Component, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { DataTableComponent } from '../../../components/ui/data-table/data-table.component';
import { TransactionData } from '../../../interfaces/transaction';
import { ButtonComponent } from '../../../components/ui/button/button.component';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { TransactionsFormComponent } from '../../../components/transactions-form/transactions-form.component';
import { TransferFormComponent } from '../../../components/transfer-form/transfer-form.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    DataTableComponent,
    ButtonComponent,
    ModalComponent,
    TransactionsFormComponent,
    TransferFormComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  constructor(private transactionService: TransactionService) {
    this.loadTransactions();
  }

  transactionsData = signal<TransactionData[]>([]);
  loading = false;

  private loadTransactions() {
    this.loading = true;
    this.transactionService.getMyTransactions().subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.transactionsData.set(
            results
              .map((result) => ({
                id: result._id,
                type: result.type,
                amount: result.amount,
                from: result.from,
                to: result.to,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
              }))
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          );
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      },
    });
  }

  onModalClosed() {
    this.loadTransactions();
  }
}
