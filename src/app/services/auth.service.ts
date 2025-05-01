import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from './base.service';
import { AuthRequest, AuthResponse } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';
  userToken: string = "authUserToken";
  userName: string = "loggedInUser";

  constructor(_http: HttpClient, private cookieService: CookieService) {
    super(_http);
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      tap((response: any) => {
        if(response.token) {
          this.cookieService.set(this.userName, data.username, 1, '/', undefined, true, 'Strict');
          this.cookieService.set(this.userToken, response.toString(), 1, '/', undefined, true, 'Strict');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/register`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.cookieService.delete(this.userToken);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(this.userToken);
  }

  getLoggedInUser(): string {
    return this.cookieService.get(this.userName);
  }
}
