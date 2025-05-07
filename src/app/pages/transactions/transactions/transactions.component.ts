import { Component, computed, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { DataTableComponent } from '../../../components/ui/data-table/data-table.component';
import { TransactionData } from '../../../interfaces/transaction';
import { ModalComponent } from '../../../components/ui/modal/modal.component';
import { TransactionsFormComponent } from '../../../components/transactions-form/transactions-form.component';
import { TransferFormComponent } from '../../../components/transfer-form/transfer-form.component';
import { SearchFormComponent } from '../../../components/search-form/search-form.component';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../../pipes/search.pipe';
import { LoaderComponent } from '../../../components/ui/loader/loader.component';
import { FilterAmountPipe } from '../../../pipes/filter-amount.pipe';
import { FilterDatePipe } from '../../../pipes/filter-date.pipe';
import { ButtonComponent } from '../../../components/ui/button/button.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    DataTableComponent,
    ModalComponent,
    TransactionsFormComponent,
    TransferFormComponent,
    SearchFormComponent,
    FormsModule,
    SearchPipe,
    CommonModule,
    LoaderComponent,
    FilterAmountPipe,
    FilterDatePipe,
    ButtonComponent,
  ],
  providers: [DatePipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe
  ) {
    this.loadTransactions();
    this.transactionService.getMyTransactions().subscribe((data) => {
      this.items = data;
    });
  }
  type: string = 'all';
  amount: number | null = null;
  startDate?: string | null = null;
  endDate?: string | null = null;
  items: any[] = [];
  transactionsData = signal<TransactionData[]>([]);
  transactionsDataFiltered = signal<TransactionData[]>([]);
  loading = false;

  searchForm: FormGroup | null = null;

  transformedStartDate: string | null = '';
  transformedEndDate: string | null = '';
  transformedCreatedDate: string | null = '';

  ngOnInit(): void {
    this.loadTransactions();
  }

  // constructor(private transactionService: TransactionService, private datePipe: DatePipe) {
  //   // this.loadTransactions();
  // }

  private loadTransactions() {
    this.loading = true;
    this.transactionService.getMyTransactions().subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.transactionsData.set(
            results
              .map((result) => ({
                // id: result._id,
                amount: result.amount,
                type: result.type,
                from: result.from,
                to: result.to,
                createdAt: result.createdAt,
                // updatedAt: result.updatedAt,
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

  onFormReceived(form: FormGroup) {
    this.searchForm = form;

    this.transactionsData.set(
      this.transactionsData()
        .filter((item) => {
          this.transformedStartDate = this.datePipe.transform(
            this.searchForm?.get('startDate')?.value,
            'mediumDate'
          );
          this.transformedEndDate = this.datePipe.transform(
            this.searchForm?.get('endDate')?.value,
            'mediumDate'
          );
          this.transformedCreatedDate = this.datePipe.transform(
            item.createdAt,
            'mediumDate'
          );
          if (
            this.transformedCreatedDate &&
            this.transformedStartDate &&
            this.transformedEndDate
          ) {
            return (
              item.amount === this.searchForm?.get('amount')?.value &&
              this.transformedStartDate <= this.transformedCreatedDate &&
              this.transformedEndDate >= this.transformedEndDate
            );
          }
          return;
        })
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    );
  }

  onClear() {
    this.type = 'all';
    this.amount = null;
    this.startDate = null;
    this.endDate = null;
  }
}
