import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Transaction } from '../interfaces/transaction';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/transactions';

  constructor(private http: HttpClient) {
    super(http);
  }

  myTransactions = signal<Transaction[]>([]);
  myTransactions$ = toObservable(this.myTransactions);

  getMyTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>(`${this.baseUrl}/my`).pipe(
      map((transactions: Transaction[]) => {
        this.myTransactions.set(transactions);
        return transactions;
      }),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        return throwError(() => error);
      })
    );
  }

  deposit(amount: number) {
    return this.post(`${this.baseUrl}/deposit`, { amount });
  }

  withdraw(amount: number) {
    return this.post(`${this.baseUrl}/withdraw`, { amount });
  }

  transfer(username: string, amount: number) {
    return this.post(`${this.baseUrl}/transfer/${username}`, { amount });
  }
}
