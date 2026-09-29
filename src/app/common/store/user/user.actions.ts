import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@common/types/user.interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    loadUsersView: emptyProps(),
    loadUsersViewSuccess: props<{ ids: string[] }>(),

    loadUsers: props<{ ids: string[] }>(),
    loadUsersSuccess: props<{ users: User[] }>(),

    addUsers: props<{ users: User[] }>(),
    addUsersSuccess: props<{ users: User[] }>(),
  },
});
