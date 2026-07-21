import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@common/services/api/user.service';
import { AuthService } from '@common/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { ApplicationActions } from './application.actions';
import { selectAppCredentials } from './application.selectors';

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(ApplicationActions.login),
      switchMap((action) => {
        return authService.login({ email: action.email, password: action.password }).pipe(
          map((response: { authToken: string; refreshToken: string }) => {
            const authToken = response.authToken;

            return ApplicationActions.loginSuccess({ authToken });
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const signup$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(ApplicationActions.signup),
      switchMap((action) => {
        return userService.create({ email: action.email, password: action.password }).pipe(
          map((response: { authToken: string; refreshToken: string }) => {
            const authToken = response.authToken;

            return ApplicationActions.signupSuccess({ authToken });
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterLogin$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ApplicationActions.loginSuccess, ApplicationActions.signupSuccess),
      tap(() => {
        router.navigate([`v/cars`]);
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const forgotPassword$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ApplicationActions.forgotPassword),
      switchMap((action) => {
        return authService.forgotPassword(action.email).pipe(
          map(() => {
            return ApplicationActions.forgotPasswordSuccess();
          }),
          tap(() => {
            router.navigate(['/reset-link-sent']);
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const resetPassword$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(ApplicationActions.resetPassword),
      switchMap((action) => {
        return authService.resetPassword(action.token, action.newPassword).pipe(
          map(() => {
            return ApplicationActions.resetPasswordSuccess();
          }),
          tap(() => {
            router.navigate(['/password-reset-success']);
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    authService = inject(AuthService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(ApplicationActions.logout),
      concatLatestFrom(() =>
        store.select(selectAppCredentials).pipe(map((credentials) => credentials?.userId))
      ),
      switchMap(([, userId]) => {
        return authService.logout(userId);
      }),
      tap(() => {
        router.navigate(['/login']);
      }),
    );
  },
  { functional: true, dispatch: false },
);
