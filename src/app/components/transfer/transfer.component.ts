import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  transferForm!: FormGroup;
 

  amount: number =0;
  username: string ='';
  message:string ='';

  transactionsService = inject(TransactionService);
  usersService = inject(UserService);
  users$ = inject(UserService).users$;
  selectedUsername: string = '';
  balance =0;

 
  constructor(private http: HttpClient, private fb: FormBuilder, ){
    this.transactionsService.getBalance().subscribe({
      next: (balance) => {
       this.balance = balance
      }
    })

  }
  ngOnInit() {
    this.transferForm = this.fb.group({
      username: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  

  transfer() {
    // if (!this.username ||  !this.amount   ) {
    //   this.message = 'Please enter a valid username and amount.';
    //   return;
    // }

    if (this.transferForm.invalid) {
      return;
    }

    const { username, amount } = this.transferForm.value;

   

    this.transactionsService.transfer(username, amount).subscribe({
      next: () => this.message = 'Transfer successful',
      error: (err) => {
        if (err.status === 400) {
          this.message = 'Transfer failed: insufficient balance or user not found.';
        } else {
          this.message = 'Transfer failed: server error.';
        }
      }
    });
  }
}
