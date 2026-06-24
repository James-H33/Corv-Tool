import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '@common/services/toast.service';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Backend API error
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Bad Request.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            // Add redirection logic here if needed
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Requested resource not found.';
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            break;
        }
      }

      // Display user-friendly notification
      toastService.showToast({
        message: errorMessage,
        duration: 3000,
        type: 'error',
      });

      // Pass the error along to the calling service if they want to handle it locally
      return throwError(() => error);
    }),
  );
};
