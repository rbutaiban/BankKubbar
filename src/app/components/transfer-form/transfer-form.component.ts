import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css',
})
export class TransferFormComponent {
  transferForm!: FormGroup;
  userBalance = this.userService.balance;
  users: string[] = [];
  errorLabel = '';
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() modalId: string = 'transfer-modal';
  private modalService = inject(ModalService);

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });

    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.map((user) => user.username);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      return;
    }

    if (this.transferForm.value.amount <= 0) {
      this.errorLabel = 'Amount must be greater than 0';
      return;
    }

    if (this.transferForm.value.amount > this.userBalance()) {
      this.errorLabel = 'Amount must be less than your balance';
      return;
    }

    this.transactionService
      .transfer(
        this.transferForm.value.username,
        this.transferForm.value.amount
      )
      .subscribe({
        next: (res) => {
          this.transferForm.reset();
          this.formSubmitted.emit();
          this.modalService.close(this.modalId);
        },
      });
  }
}
