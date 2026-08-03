import { HttpClient, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { addTokenHeader } from '@common/interceptors/auth.interceptor';
import { ApplicationService } from '@common/services/application.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  Subject,
  switchMap,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  appService = inject(ApplicationService);

  router = inject(Router);
  baseUrl = this.appService.getBaseApiUrl();

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private refreshErrorSubject = new Subject();

  login(credentials: { email: string; password: string }): Observable<{
    authToken: string;
    refreshToken: string;
  }> {
    return this.http.post<{ authToken: string; refreshToken: string }>(
      `${this.baseUrl}/auth/login`,
      credentials,
      { withCredentials: true },
    );
  }

  refreshAccessToken(): Observable<{
    authToken: string;
    refreshToken: string;
  }> {
    return this.http.get<{
      authToken: string;
      refreshToken: string;
    }>(`${this.baseUrl}/auth/refresh`, { withCredentials: true });
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/auth/forgot-password`,
      { email },
      { withCredentials: true },
    );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/auth/reset-password`,
      { token, newPassword },
      { withCredentials: true },
    );
  }

  verifyUser(token: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/auth/verify-user`,
      { token },
    );
  }

  handleTokenExpiredError(request: HttpRequest<any>, next: HttpHandlerFn) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshAccessToken().pipe(
        switchMap(({ authToken }) => {
          this.isRefreshing = false;

          this.appService.setAuthToken(authToken);
          this.refreshTokenSubject.next(authToken);

          // Retry the original request with the fresh token
          return next(addTokenHeader(request, authToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          // If Refresh fails we cancel all pending requests that are waiting for a new token
          this.refreshErrorSubject.next(err);
          return throwError(() => err);
        }),
      );
    } else {
      // If a refresh is already in progress, wait for the new token to arrive, then retry
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        takeUntil(this.refreshErrorSubject),
        switchMap((token) => next(addTokenHeader(request, token))),
      );
    }
  }

  logout(userId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/auth/logout`,
      {
        userId,
      },
      { withCredentials: true },
    );
  }
}
