import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-transactions-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './transactions-form.component.html',
  styleUrl: './transactions-form.component.css',
})
export class TransactionsFormComponent {
  transactionForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() modalId: string = 'transaction-modal';
  private modalService = inject(ModalService);
  private userService = inject(UserService);
  errorLabel = '';
  userBalance = this.userService.balance;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required]],
      type: ['deposit', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      return;
    }

    if (this.transactionForm.value.type === 'deposit') {
      if (this.transactionForm.value.amount <= 0) {
        this.errorLabel = 'Amount must be greater than 0';
        return;
      }
      this.transactionService
        .deposit(this.transactionForm.value.amount)
        .subscribe({
          next: (res) => {
            this.transactionForm.reset({ type: 'deposit' });
            this.formSubmitted.emit();
            this.modalService.close(this.modalId);
          },
        });
    } else {
      if (this.transactionForm.value.amount <= 0) {
        this.errorLabel = 'Amount must be greater than 0';
        return;
      }
      if (this.transactionForm.value.amount > this.userBalance()) {
        this.errorLabel = 'Amount must be less than your balance';
        return;
      }
      this.transactionService
        .withdraw(this.transactionForm.value.amount)
        .subscribe({
          next: (res) => {
            this.transactionForm.reset({ type: 'deposit' });
            this.formSubmitted.emit();
            this.modalService.close(this.modalId);
          },
        });
    }
  }
}
