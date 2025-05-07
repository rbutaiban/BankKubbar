import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ModalComponent } from '../../components/ui/modal/modal.component';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css',
})
export class TransferComponent {
  username = '';
  amount = 0;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      (this.username = params['username']), (this.amount = params['amount']);
    });
  }

  onSubmit() {
    this.transactionService.transfer(this.username, this.amount).subscribe({
      next: () => this.router.navigate(['/dashboard']),
    });
  }

  onDecline() {
    this.router.navigate(['/dashboard']);
  }
}
