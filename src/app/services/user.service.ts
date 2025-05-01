import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';

  constructor(private http: HttpClient) {
    super(http);
  }

  getProfile(): Observable<User> {
    return this.get<User>(`${this.baseUrl}/me`).pipe(
      map((user: User) => user),
      catchError((error) => {
        console.error('Error fetching profile:', error);
        return throwError(() => error);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users: User[]) => users),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }
}
