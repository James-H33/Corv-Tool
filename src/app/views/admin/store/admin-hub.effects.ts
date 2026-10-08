import { inject } from '@angular/core';
import { UserService } from '@common/services/api/user.service';
import { CarActions } from '@common/store/car/car.actions';
import { UserActions } from '@common/store/user/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, switchMap } from 'rxjs/operators';
import { AdminHubService } from '../services/admin-hub.service';
import { AdminHubActions } from './admin-hub.actions';
import { selectLoadedUserIds, selectPage, selectUserIds } from './admin-hub.selectors';

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
                    page: 1,
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
      concatLatestFrom(() => [
        store.select(selectPage),
        store.select(selectUserIds),
        store.select(selectLoadedUserIds),
      ]),
      concatMap(([{ userIds: nextUserIds }, page, , loadedUserIds]) => {
        return userService.getUsersByIds(nextUserIds).pipe(
          switchMap((users) => {
            return [
              AdminHubActions.loadNextSetOfUsersSuccess({
                page: page + 1,
                loadedUserIds: [...loadedUserIds, ...nextUserIds],
              }),
              UserActions.addUsers({ users }),
            ];
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loadCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), adminHubService = inject(AdminHubService)) => {
    return actions$.pipe(
      ofType(AdminHubActions.loadCurrentUserStart),
      switchMap(({ userId }) => {
        return adminHubService.getUserAndUserCars(userId).pipe(
          switchMap(({ user, cars }) => {
            return [
              AdminHubActions.loadCurrentUserSuccess(),
              CarActions.addCars({ cars }),
              UserActions.addUsers({ users: [user] }),
            ];
          }),
        );
      }),
    );
  },
  { functional: true },
);
