import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../shared/form-error/form-error.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, RouterModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css',
})
export class TransferFormComponent {
  transferForm!: FormGroup;
  linkForm!: FormGroup;

  userBalance = this.userService.balance;
  users: string[] = [];
  errorLabel = '';
  isOwner = false;
  linkAccount = '';
  linkAmount: number | null = null;
  transferAmount: number = 0;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() modalId: string = 'transfer-modal';
  private modalService = inject(ModalService);
  user$!: Observable<User | null>;

  isTransfer = signal<boolean>(true);
  toggleTransfer(value: boolean) {
    this.isTransfer.set(value);
  }

  link = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });

    this.linkForm = this.fb.group({
      amount: ['', [Validators.required]],
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

  checkOwnership(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe((loggedInUser) => {
      if (loggedInUser) {
        this.isOwner = loggedInUser.username == this.linkAccount;
        if (this.isOwner) {
          this.transferForm.patchValue({
            amount: this.linkAmount,
            username: this.linkAccount,
          });
        }
        this.transferForm.get('username')?.disable();
        if (!this.isOwner) {
          this.transferForm.get('amount')?.disable();
        }
      }
    });
  }

  generateTransferLink() {
    if (this.linkForm.invalid) {
      this.errorLabel =
        'Please enter a valid amount before generating the link.';
      return;
    } else {
      const username = this.userService.user()?.username;
      if (!username) return;

      const baseUrl = window.location.origin;
      const link = `${baseUrl}/transfer?username=${encodeURIComponent(
        username
      )}&amount=${this.linkForm.get('amount')?.value}&transfer=True`;
      navigator.clipboard.writeText(link).then(() => {
        showSnackbar('Transfer link copied to clipboard!');
        this.link.set(link);
        // setTimeout(() => {
        //   this.transferForm.reset();
        //   this.formSubmitted.emit();
        //   this.modalService.close(this.modalId);
        // }, 1000);
      });
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.link()!);
    showSnackbar('Transfer link copied to clipboard!');
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

function showSnackbar(message: string): void {
  const snackbar = document.getElementById('snackbar');
  if (!snackbar) return;

  snackbar.textContent = message;
  snackbar.className = 'show';

  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}
