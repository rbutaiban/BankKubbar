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
    return this.put(`${this.baseUrl}/deposit`, { amount }).pipe(
      tap(() => {
        this.userService.getProfile().subscribe();
      })
    );
  }

  withdraw(amount: number) {
    return this.put(`${this.baseUrl}/withdraw`, { amount }).pipe(
      tap(() => {
        this.userService.getProfile().subscribe();
      })
    );
  }

  transfer(username: string, amount: number) {
    return this.put(`${this.baseUrl}/transfer/${username}`, { amount }).pipe(
      tap(() => {
        this.userService.getProfile().subscribe();
      })
    );
  }
}
