import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApplicationService } from '@common/services/application.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appService = inject(ApplicationService);

  // 1. Skip attaching access token if the request is the refresh token endpoint itself
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  // 2. Attach the current access token to the request headers
  const authReq = addTokenHeader(req, appService.getAuthToken());

  // 3. Process request and catch 401 errors
  return next(authReq);
};

export function addTokenHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
  if (!token) {
    return request;
  }

  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
}
