import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {

  username = '';
  amount =0;
  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router){
    this.route.queryParams.subscribe(params =>{
    this.username =params['username'],
    this.amount = params['amount']}
    )
    console.log(this.username)
    console.log(this.amount)
  }

  onSubmit(){
    this.transactionService
      .transfer(
        this.username,
        this.amount
      )
      .subscribe({
        next:() => this.router.navigate(['/'])
      });


  }


}
