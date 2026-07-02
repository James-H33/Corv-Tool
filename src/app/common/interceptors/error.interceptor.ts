import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '@common/services/toast.service';
import { ErrorCodes, ErrorCodesReason } from '@common/types/error-codes';

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

  return next(req).pipe(
    catchError((error: HttpErrorResponseWithCode) => {
      let errorMessage = 'An unknown error occurred!';
      const errorCode = error?.error?.errorCode;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else if (errorCode) {
        errorMessage = getErrorCodeReason(errorCode);
      } else {
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Bad Request.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            break;
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
  switch (code) {
    case ErrorCodes.INVALID_EMAIL_OR_PASSWORD:
      return ErrorCodesReason[code];
    case ErrorCodes.USER_NOT_FOUND:
      return ErrorCodesReason[code];
    case ErrorCodes.DATABASE_CONNECTION_ERROR:
      return ErrorCodesReason[code];
    case ErrorCodes.CAR_NOT_FOUND:
      return ErrorCodesReason[code];
    case ErrorCodes.GEMINI_API_ERROR_SERVICE_UNAVAILABLE:
      return ErrorCodesReason[code];
    default:
      return ErrorCodesReason[999];
  }
}
