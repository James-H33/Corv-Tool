import { createSelector } from '@ngrx/store';
import { userFeature } from './user.reducer';
import { User } from '@common/types/user.interface';

export const {
  selectUsers,
} = userFeature;

export const selectUsersMap = createSelector(
  selectUsers,
  (users) => users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<string, User>)
);

