import { createActionGroup, props } from '@ngrx/store';
import { User } from '@common/types/user.interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadUsers: props<{ ids: string[] }>(),
    loadUsersSuccess: props<{ users: User[] }>(),

    addUsers: props<{ users: User[] }>(),
    addUsersSuccess: props<{ users: User[] }>(),
  },
});
