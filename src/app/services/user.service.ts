import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { toObservable } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';

  constructor(private http: HttpClient) {
    super(http);
  }

  user = signal<User | null>(null);
  user$ = toObservable(this.user);

  users = signal<User[]>([]);
  users$ = toObservable(this.users);

  getProfile(): Observable<User> {
    return this.get<User>(`${this.baseUrl}/me`).pipe(
      map((user: User) => user),
      catchError((error) => {
        console.error('Error fetching profile:', error);
        return throwError(() => error);
      }),
      tap((user: User) => {
        this.user.set(user);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users: User[]) => {
        this.users.set(users);
        return users;
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }
}
