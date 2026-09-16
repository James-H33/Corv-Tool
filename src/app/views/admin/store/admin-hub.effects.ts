import { inject } from '@angular/core';
import { CarActions } from '@common/store/car/car.actions';
import { UserActions } from '@common/store/user/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { AdminHubService } from '../services/admin-hub.service';
import { AdminHubActions } from './admin-hub.actions';

export const loadCarsEffect = createEffect(
  (actions$ = inject(Actions), adminHubService = inject(AdminHubService)) => {
    return actions$.pipe(
      ofType(AdminHubActions.loadCars),
      switchMap(() => {
        return adminHubService.getCarsAndUsers().pipe(
          switchMap(({ cars, users }) => {
            const ids = cars.map((car) => car.id);

            return [
              AdminHubActions.loadCarsSuccess({ carIds: ids }),
              CarActions.addCars({ cars }),
              UserActions.addUsers({ users }),
            ];
          }),
        );
      }),
    );
  },
  { functional: true },
);
