import { Component, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { DataTableComponent } from '../../../components/ui/data-table/data-table.component';
import { TransactionData } from '../../../interfaces/transaction';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { TransactionsFormComponent } from '../../../components/transactions-form/transactions-form.component';
import { TransferFormComponent } from '../../../components/transfer-form/transfer-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../../pips/search.pipe';
import { LoaderComponent } from '../../../components/ui/loader/loader.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    DataTableComponent,
    ModalComponent,
    TransactionsFormComponent,
    TransferFormComponent,
    FormsModule,
    SearchPipe,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  constructor(private transactionService: TransactionService) {
    this.loadTransactions();
  }
  type: string = 'all';
  items: any[] = [];
  transactionsData = signal<TransactionData[]>([]);
  loading = false;

  ngOnInit(): void {
    this.transactionService.getMyTransactions().subscribe((data) => {
      this.items = data;
      console.log('All fetched items:', this.items);
    });
  }

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
