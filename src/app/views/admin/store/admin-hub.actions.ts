import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AdminHubActions = createActionGroup({
  source: 'AdminHub',
  events: {
    loadCars: emptyProps(),
    loadCarsSuccess: props<{ carIds: string[] }>(),

    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ userIds: string[] }>(),
  },
});
