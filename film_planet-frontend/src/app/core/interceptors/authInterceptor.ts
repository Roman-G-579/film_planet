import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {catchError, Observable, switchMap, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn, injector = inject): Observable<HttpEvent<unknown>> => {
  const authService = injector(AuthService);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Clone request and set Authorization header if token exists
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retrieve the new token from localStorage after refresh
            const newToken = localStorage.getItem('token');
            if (newToken) {
              const newRequest = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next(newRequest);
            }
            return throwError(() => new Error("Refresh token failed"));
          }),
          catchError(() => throwError(() => new Error("Session expired")))
        );
      }
      return throwError(() => error);
    })
  );
};
