import { inject } from '@angular/core';
import { UserService } from '@common/services/api/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs';
import { UserActions } from './user.actions';
import { selectUsersMap } from './user.selectors';

export const loadUsers = createEffect(
  (actions$ = inject(Actions), store = inject(Store), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UserActions.loadUsers),
      concatLatestFrom(() => store.select(selectUsersMap)),
      concatMap(([action, usersMap]) => {
        const { ids } = action;
        const unloadedUserIds = ids.filter((id) => !(id in usersMap));
        const usersFromCache = Object.values(usersMap);

        return userService.getUsersByIds(unloadedUserIds).pipe(
          map((users) => {
            const allUsers = [...usersFromCache, ...users];

            return UserActions.loadUsersSuccess({ users: allUsers });
          }),
        );
      }),
    ),
  { functional: true },
);

export const addUsersEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(UserActions.addUsers),
      concatLatestFrom(() => [store.select(selectUsersMap)]),
      map(([action, usersMap]) => {
        const { users } = action;
        const usersNotInCache = [];

        for (const user of users) {
          if (!(user.id in usersMap)) {
            usersNotInCache.push(user);
          } else {
            usersMap[user.id] = user;
          }
        }

        return UserActions.addUsersSuccess({
          users: [...Object.values(usersMap), ...usersNotInCache],
        });
      }),
    ),
  { functional: true },
);
