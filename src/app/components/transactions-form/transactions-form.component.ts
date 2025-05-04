import { Component, Output, EventEmitter, inject } from '@angular/core';
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
  private modalService = inject(ModalService);

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
      this.transactionService
        .deposit(this.transactionForm.value.amount)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.transactionForm.reset({ type: 'deposit' });
            this.formSubmitted.emit();
            this.modalService.close();
          },
        });
    } else {
      this.transactionService
        .withdraw(this.transactionForm.value.amount)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.transactionForm.reset({ type: 'deposit' });
            this.formSubmitted.emit();
            this.modalService.close();
          },
        });
    }
  }
}
