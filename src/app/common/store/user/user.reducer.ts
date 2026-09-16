import { User } from '@common/types/user.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

interface UserState {
  users: User[];
  isLoadingUsers: boolean;
}

export const initialUserState: UserState = {
  users: [],
  isLoadingUsers: false,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer<UserState>(
    initialUserState,

    on(UserActions.loadUsers, (state) => ({
      ...state,
      isLoadingUsers: true,
    })),

    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      isLoadingUsers: false,
      users,
    })),

    on(UserActions.addUsersSuccess, (state, { users }) => ({
      ...state,
      users,
    })),

  ),
});
