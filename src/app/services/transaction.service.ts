import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError, Observable, tap } from 'rxjs';

import { Transaction } from '../interfaces/transaction';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/transactions';

  constructor(private http: HttpClient, private userService: UserService) {
    super(http);
  }

  private handleTransaction<T>(operation: Observable<T>): Observable<T> {
    return operation.pipe(
      tap(() => {
        this.userService.getProfile().subscribe();
      }),
      catchError((error) => {
        console.error('Transaction failed:', error);
        return throwError(() => error);
      })
    );
  }

  getMyTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>(`${this.baseUrl}/my`).pipe(
      map((transactions: Transaction[]) => transactions),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        return throwError(() => error);
      })
    );
  }

  deposit(amount: number) {
    return this.handleTransaction(
      this.put(`${this.baseUrl}/deposit`, { amount })
    );
  }

  withdraw(amount: number) {
    return this.handleTransaction(
      this.put(`${this.baseUrl}/withdraw`, { amount })
    );
  }

  transfer(username: string, amount: number) {
    return this.handleTransaction(
      this.put(`${this.baseUrl}/transfer/${username}`, { amount })
    );
  }
}
