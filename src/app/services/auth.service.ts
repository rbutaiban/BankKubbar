import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from './base.service';
import { AuthRequest, AuthResponse } from '../interfaces/auth';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl =
    'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';
  userToken: string = 'authUserToken';
  userName: string = 'loggedInUser';
  private userService = inject(UserService);

  constructor(_http: HttpClient, private cookieService: CookieService) {
    super(_http);
  }

  private token = signal<string | null>(this.cookieService.get(this.userToken));
  readonly token$ = toObservable(this.token);
  private isLoggedIn = signal<boolean>(
    this.cookieService.check(this.userToken)
  );
  readonly isLoggedIn$ = computed(() => this.isLoggedIn());

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      tap((response: any) => {
        if (response.token) {
          this.cookieService.set(
            this.userName,
            data.username,
            1,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.cookieService.set(
            this.userToken,
            response.token,
            1,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.token.set(response.token);
          this.isLoggedIn.set(true);
          this.userService.getProfile().subscribe();
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
      tap((response: any) => {
        if (response.token) {
          this.cookieService.set(
            this.userName,
            data.username,
            1,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.cookieService.set(
            this.userToken,
            response.token,
            1,
            '/',
            undefined,
            true,
            'Strict'
          );
          this.token.set(response.token);
          this.isLoggedIn.set(true);
          this.userService.getProfile().subscribe();
        }
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.cookieService.delete(this.userToken);
    this.cookieService.delete(this.userName);
    this.token.set(null);
    this.isLoggedIn.set(false);
    this.userService.user.set(null);
  }

  onIsLoggedIn(): boolean {
    const hasToken = this.cookieService.check(this.userToken);
    this.isLoggedIn.set(hasToken);

    if (hasToken && !this.userService.user()) {
      this.userService.getProfile().subscribe();
    }

    return this.isLoggedIn();
  }

  getLoggedInUser(): string {
    return this.cookieService.get(this.userName);
  }
}
