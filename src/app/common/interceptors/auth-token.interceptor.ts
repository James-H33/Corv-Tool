import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApplicationService } from '@common/services/application.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const appService = inject(ApplicationService);
  const authToken = appService.getAuthToken() ?? '';

  const modifiedReq = req.clone({
    headers: req.headers.set('authorization', `Bearer ${authToken}`),
  });

  return next(modifiedReq);
};
