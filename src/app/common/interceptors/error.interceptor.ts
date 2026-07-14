import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@common/services/auth.service';
import { ToastService } from '@common/services/toast.service';
import { ErrorCodes, ErrorCodesReason } from '@common/types/error-codes';
import { catchError, throwError } from 'rxjs';

interface ErrorPayload {
  errorCode: keyof typeof ErrorCodesReason;
  statusCode: number;
  success: boolean;
  message: string;
}

interface HttpErrorResponseWithCode extends HttpErrorResponse {
  error: ErrorPayload;
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponseWithCode) => {
      let errorMessage = 'An unknown error occurred!';
      const errorCode = error?.error?.errorCode;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else if (errorCode) {
        errorMessage = getErrorCodeReason(errorCode);

        if (errorCode === ErrorCodes.ACCESS_TOKEN_EXPIRED) {
          return authService.handleTokenExpiredError(req, next);
        }

        if (errorCode === ErrorCodes.INVALID_REFRESH_TOKEN) {
          router.navigate(['/login']);

          return throwError(() => new Error('Invalid refresh token. Please log in again.'));
        }
      } else {
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Bad Request.';
            break;
          case 401:
            return authService.handleTokenExpiredError(req, next);
          case 403:
            errorMessage = 'Forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Requested resource not found.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            break;
        }
      }

      toastService.showToast({
        message: errorMessage,
        duration: 3000,
        type: 'error',
      });

      return throwError(() => error);
    }),
  );
};

function getErrorCodeReason(code: keyof typeof ErrorCodesReason): string {
  return ErrorCodesReason[code] ?? 'An unknown error occurred!';
}
