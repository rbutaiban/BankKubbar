import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError, Observable } from 'rxjs';

import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/transactions';

  constructor(private http: HttpClient) {
    super(http);
  }

  getMyTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>(`${this.baseUrl}/my`).pipe(
      map((transactions: Transaction[]) => {
        return transactions;
      }),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        return throwError(() => error);
      })
    );
  }

  deposit(amount: number) {
    console.log({ amount });
    return this.put(`${this.baseUrl}/deposit`, { amount });
  }

  withdraw(amount: number) {
    return this.put(`${this.baseUrl}/withdraw`, { amount });
  }

  transfer(username: string, amount: number) {
    return this.put(`${this.baseUrl}/transfer/${username}`, { amount });
  }
}
