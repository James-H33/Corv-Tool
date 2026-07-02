import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '@common/services/application.service';
import { LoginService } from '@common/services/login.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { ApplicationActions } from './application.actions';

export const getWorkspaceData$ = createEffect(
  (actions$ = inject(Actions), appService = inject(ApplicationService)) => {
    return actions$.pipe(
      ofType(ApplicationActions.init),
      map(() => {
        const authToken = appService.getAuthTokenFromStorage();

        return ApplicationActions.initSuccess({
          authToken: authToken ?? '',
        });
      }),
    );
  },
  { functional: true },
);

export const login$ = createEffect(
  (
    actions$ = inject(Actions),
    loginService = inject(LoginService),
    appService = inject(ApplicationService),
  ) => {
    return actions$.pipe(
      ofType(ApplicationActions.login),
      switchMap((action) => {
        return loginService.login({ email: action.email, password: action.password }).pipe(
          map((response: any) => {
            const authToken = response.authToken;

            appService.setCredentials(authToken);
            return ApplicationActions.loginSuccess({ authToken });
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
      ofType(ApplicationActions.loginSuccess),
      tap(() => {
        router.navigate([`v/cars`]);
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    appService = inject(ApplicationService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(ApplicationActions.logout),
      tap(() => {
        appService.logout();
        router.navigate(['/login']);
      }),
    );
  },
  { functional: true, dispatch: false },
);
