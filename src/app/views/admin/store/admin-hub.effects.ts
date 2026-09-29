import { inject } from '@angular/core';
import { CarActions } from '@common/store/car/car.actions';
import { UserActions } from '@common/store/user/user.actions';
import { UserService } from '@common/services/api/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { AdminHubService } from '../services/admin-hub.service';
import { AdminHubActions } from './admin-hub.actions';
import { concatLatestFrom } from '@ngrx/operators';
import { selectLoadedUserIds, selectPage } from './admin-hub.selectors';
import { Store } from '@ngrx/store';

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

export const loadUsersInitEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(AdminHubActions.loadUsersInit),
      switchMap(() => {
        return userService.getUserIdsForView().pipe(
          switchMap((ids) => {
            const firstTenIds = ids.slice(0, 10);

            return userService.getUsersByIds(firstTenIds).pipe(
              switchMap((users) => {
                return [
                  AdminHubActions.loadUsersInitSuccess({
                    userIds: ids,
                    page: 2,
                    loadedUserIds: firstTenIds,
                  }),
                  UserActions.addUsers({ users }),
                ];
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadNextSetOfUsersEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(AdminHubActions.loadNextSetOfUsers),
      concatLatestFrom(() => [store.select(selectPage), store.select(selectLoadedUserIds)]),
      switchMap(([, page, loadedUserIds]) => {
        return userService.getUserIdsForView().pipe(
          switchMap((ids) => {
            const nextTenIds = ids.slice(page * 10, (page + 1) * 10);

            return userService.getUsersByIds(nextTenIds).pipe(
              switchMap((users) => {
                return [
                  AdminHubActions.loadNextSetOfUsersSuccess({
                    page: page + 1,
                    loadedUserIds: [...loadedUserIds, ...nextTenIds],
                  }),
                  UserActions.addUsers({ users }),
                ];
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
